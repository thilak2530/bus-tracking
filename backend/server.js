import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";
import dotenv from 'dotenv';
import { Server } from "socket.io";
import http from "http";

dotenv.config();




const app = express();
const port = 3001;
const saltRound= 10;


const db = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});


db.connect()
    .then(() => console.log(" Connected to PostgreSQL"))
    .catch(err => console.error(" Database connection error:", err));

    app.use(cors({ origin: "http://localhost:3000"}));
    app.use(bodyParser.json());  
    app.use(bodyParser.urlencoded({ extended: true }));


app.post("/student-login", async (req, res) => {
  const { username, password } = req.body;  

  try {

        const result = await db.query("SELECT * FROM busss WHERE username = $1 ",[username]);
        if(result.rows.length===0){
            return res.json({ success: false, msg: "Invalid username or password" });
        }  
            const user=result.rows[0];
            const hashedpassword=user.password;
            if(hashedpassword.startsWith("$2")){
                const match= await bcrypt.compare(password,hashedpassword);
                if(match){
                    res.json({ success: true });
                }else{
                    res.json({ success: false, msg: "Invalid username or password" });
                }
            }else{ 
                if(password === hashedpassword){
                    const newhash=await bcrypt.hash(password,saltRound);
                    await db.query("update busss set password=$1 where username=$2",[newhash,username]);
                    return res.json({success:true})
                }else{
                    res.json({ success: false, msg: "Invalid username or password" });
                }
            }
        
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, msg: "Server error" });
    }
});

app.post("/driver-login", async (req, res) => {
  const { username, password } = req.body;  

  try {

        const result = await db.query("SELECT * FROM busdriver WHERE username = $1 ",[username]);
        if(result.rows.length===0){
            return res.json({ success: false, msg: "Invalid username or password" });
        }    
            const user=result.rows[0];
            const hashedpassword=user.password;
            if(hashedpassword.startsWith("$2")){
                const match= await bcrypt.compare(password,hashedpassword);
                if(match){
                    res.json({ success: true });
                }else{
                    res.json({ success: false, msg: "Invalid username or password" });
                }
            }else{ 
                if(password === hashedpassword){
                    const newhash=await bcrypt.hash(password,saltRound);
                    await db.query("update busdriver set password=$1 where username=$2",[newhash,username]);
                    return res.json({success:true})
                }else{
                    res.json({ success: false, msg: "Invalid username or password" });
                }
            }
        
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, msg: "Server error" });
    }
});

app.post("/reset", async (req,res) => {

    const{re_username,re_password}=req.body;
    const { username, password } = req.body;
    try{    
        const result= await db.query("select *from busss where username=$1",[username]);
        if (result.rows.length===0){
            return res.json({save:false})
        }
        const user=result.rows[0];
        const match =await bcrypt.compare(password,user.password);

        if(!match){
            return res.json({save:false});
        }
        const newhashed = await bcrypt.hash(re_password,saltRound);
        await db.query(
        "UPDATE busss SET username = $1, password = $2 WHERE username = $3",
        [re_username, newhashed, username]);
        return res.json({ save: true });
        
    }
    catch(err){
        res.status(500).json({save:false, msg:"e"});
    }
})


const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
});



app.post("/driver/send-data", async (req, res) => {
  const { busNo, stop, time } = req.body;

  await db.query(
  "INSERT INTO bus_updates (bus_no, stop, time) VALUES ($1, $2, $3)",
  [busNo, stop, time]
);

  try {
    console.log(`Received update: Bus ${busNo}, Stop: ${stop}, Time: ${time}`);
    // You can also store this info in PostgreSQL if needed
     io.emit("bus-data", { busNo, stop, time });
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving stop update:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});


app.post("/driver/complete-trip", async (req, res) => {
  const { busNo } = req.body;
  try {
    await db.query("DELETE FROM bus_updates WHERE bus_no = $1", [busNo]);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting updates:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

app.get("/student/get-updates/:busNo", async (req, res) => {
  const { busNo } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM bus_updates WHERE bus_no = $1 ORDER BY time ASC",
      [busNo]
    );

    res.json(result.rows);  
  } catch (err) {
    console.error("Error fetching updates:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});



server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});