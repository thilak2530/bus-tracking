import express from "express";
import bodyParser from "body-parser"
import cors from 'cors';
import pg from "pg";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { Server } from "socket.io";
import http from "http";
dotenv.config();






const app = express();
const port = process.env.PORT || 3001;
const saltRound= 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});  




db.query("SELECT 1")
  .then(() => console.log("✅ PostgreSQL connected successfully."))
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });



app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;  

  try {

        const result = await db.query("SELECT * FROM admin WHERE username = $1 ",[username]);
        if(result.rows.length===0){
            return res.json({ success: false, msg: "Invalid username or password" });
        }    
            const user=result.rows[0];
            const hashedpassword=user.password;
            if(hashedpassword.startsWith("$2")){
                const match= await bcrypt.compare(password,hashedpassword);
                const privatecheck=await db.query("SELECT admin_name from admin WHERE password=$1",[hashedpassword])
                if(match){
                    res.json({ success: true,privatecheck:privatecheck.rows});
                }else{
                    res.json({ success: false,  msg: "Invalid username or password" });
                }
            }else{ 
                if(password === hashedpassword){
                    const newhash=await bcrypt.hash(password,saltRound);
                    await db.query("update admin set password=$1 where username=$2",[newhash,username]);
                    const privatecheck=await db.query("SELECT admin_name from admin WHERE password=$1",[newhash])
                    return res.json({success:true,privatecheck:privatecheck.rows})
                }else{
                    res.json({ success: false, msg: "Invalid username or password" });
                }
            }
        
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, msg: "Server error" });
    }
});


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
                const privatecheck=await db.query("SELECT rollno from busss WHERE password=$1",[hashedpassword])
                if(match){
                    res.json({ success: true ,privatecheck:privatecheck.rows});
                }else{
                    res.json({ success: false, msg: "Invalid username or password" });
                }
            }else{ 
                if(password === hashedpassword){
                    const newhash=await bcrypt.hash(password,saltRound);
                    await db.query("update busss set password=$1 where username=$2",[newhash,username]);
                    const privatecheck=await db.query("SELECT rollno from busss WHERE password=$1",[newhash])
                    return res.json({success:true,privatecheck:privatecheck.rows})
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
                const privatecheck=await db.query("SELECT busno from busdriver WHERE password=$1",[hashedpassword])
                if(match){
                    res.json({ success: true,privatecheck:privatecheck.rows });
                }else{
                    res.json({ success: false, msg: "Invalid username or password" });
                }
            }else{ 
                if(password === hashedpassword){
                    const newhash=await bcrypt.hash(password,saltRound);
                    await db.query("update busdriver set password=$1 where username=$2",[newhash,username]);
                    const privatecheck=await db.query("SELECT busno from busdriver WHERE password=$1",[newhash])
                    return res.json({success:true,privatecheck:privatecheck.rows})
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

app.post("/change-pass",async(req,res)=>{
  const {rollno}=req.body;
  try{
      await db.query(
        "UPDATE busss SET password =$1 WHERE rollno=$2",["12345",rollno]
      );
      return res.json({success:true})
  }
  catch{
    return res.json({success:false})

  }
})


const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST"],
    credentials: true
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
    io.emit("bus-data", { busNo, stop, time });
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving stop update:", error);
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


app.get("/get-bus-timings", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM bus_stops ORDER BY bus_number, stop_key");

    const grouped = {};

    for (const row of result.rows) {
      const { bus_number, stop_key, stop_name, arrival_time, departure_time } = row;

      if (!grouped[bus_number]) {
        grouped[bus_number] = { bus: bus_number };
      }

      grouped[bus_number][stop_key] = [stop_name, arrival_time, departure_time];
    }

    const responseArray = Object.values(grouped);
    res.json(responseArray);
  } catch (err) {
    console.error("Error fetching timings:", err);
    res.status(500).json({ error: "Failed to fetch bus timings" });
  }
});


app.get("/bus-stops",async(req,res)=>{
  const busNo = req.query.busNo;
  try{
    const busstops = await db.query("SELECT * FROM bus_stops WHERE bus_number=$1",[busNo]);
    res.json(busstops.rows);
  }
  catch(error){
      console.error("Error fetching bus stops:", error);
      res.status(500).json({ error: "Internal server error" });
  }
})

app.post("/add-bus-stops",async(req,res)=>{
  const {busNo,alpha,stopp,arrived,depart} = req.body;
  try{
    const busstops = await db.query("INSERT INTO bus_stops VALUES ($1, $2, $3, $4, $5)",[busNo,alpha,stopp,arrived,depart]);
    res.json({success:true});
  }
  catch(error){
      console.error("Error fetching bus stops:", error);
      res.status(500).json({ error: "Internal server error" });
  }
})


app.post("/private-remove",async(req,res)=>{
  const{rollno}=req.body;
  try{
      const roll=await db.query("DELETE FROM private WHERE rollno = $1",[rollno]);
      res.json({success:true});
  }
  catch(error){
    console.error("Error fetching rollno:", error);
  }
})
app.post("/private",async(req,res)=>{
  const{rollno,username}=req.body;
  try{
      await db.query("INSERT INTO private (name,rollno) VALUES ($1,$2)",[username,rollno]);
      
      res.json({success:true});
  }
  catch(error){
    console.error("Error fetching rollno:", error);
     res.status(500).json({ success: false, error: "Failed to insert data" });
  }
})

app.get("/private/:rollno",async(req,res)=>{
  const{rollno}=req.params;
  try{  
      const roll =await db.query("SELECT rollno FROM private WHERE rollno=($1)",[rollno]);
      res.json({success:true,roll});
  }
  catch(error){
    console.error("Error fetching rollno:", error);
     res.status(500).json({ success: false, error: "Failed to insert data" });
  }
})




app.post("/driver/complete-trip", async (req, res) => {
  const { busNo } = req.body;
  
  try {
    await db.query("DELETE FROM live_locations WHERE driver = $1", [busNo]);
    await db.query("DELETE FROM bus_updates WHERE bus_no = $1", [busNo]);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting updates:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});




app.post("/update_location", async (req, res) => {
  const { driver, latitude, longitude } = req.body;

  try {
    await db.query(
      "INSERT INTO live_locations (driver, latitude, longitude, time) VALUES ($1, $2, $3, NOW())",
      [driver, latitude, longitude]
    );
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update location" });
  }
});




app.get("/live-location/:busno", async (req, res) => {
  const { busno } = req.params;

  try {
    const result = await db.query("SELECT latitude, longitude FROM live_locations WHERE driver = $1", [busno]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.json(null);
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/get-bus-timings/:busno", async (req, res) => {
  const { busno } = req.params;

  try {
    const result = await db.query("SELECT lat, lng, stop_name FROM bus_stops WHERE bus_number = $1", [busno]);
    if (result.rows.length > 0) {
      res.json(result.rows); 
    } else {
      res.json([]); 
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/stop_reached", async (req, res) => {
  const { stop_key, stop_name, bus_number, timestamp } = req.body;

  try {
    // Optional: Save to DB
    await db.query(
      "INSERT INTO bus_updates (bus_no, stop, time) VALUES ($1, $2, $3)",
      [bus_number, stop_name, timestamp]
    );

    // ✅ Emit update to students via socket
    io.emit("bus-data", {
      busNo: bus_number,
      stop: stop_name,
      time: timestamp
    });

    console.log(`✅ Emitted: Bus ${bus_number} reached ${stop_name} at ${timestamp}`);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Error in /stop-reached:", err);
    res.status(500).json({ success: false });
  }
});



server.listen(port, () => {
  console.log(`Server running on :${port}`);
});

