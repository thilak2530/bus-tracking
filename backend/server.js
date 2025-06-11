import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();




const app = express();
const port = 3001;
const saltRound= 10;

// PostgreSQL Connection
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

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;  

  try {

        const result = await db.query("SELECT * FROM busss WHERE username = $1 ",[username]);
        if (result.rows.length > 0) {
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
            res.json({save:false});
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

// Start Server
app.listen(port, () => {
    console.log(` Server running on http://localhost:${port}`);
});