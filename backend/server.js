import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
import pg from "pg";


const app = express();
const port = 3001;

// PostgreSQL Connection
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "bus",
    password: "2530",
    port: 5432
});

db.connect()
    .then(() => console.log(" Connected to PostgreSQL"))
    .catch(err => console.error(" Database connection error:", err));

    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(bodyParser.json());  
    app.use(bodyParser.urlencoded({ extended: true }));

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
      const result = await db.query(
          "SELECT * FROM busss WHERE username = $1 AND password = $2",
          [username, password]
      );

      if (result.rows.length > 0) {
          res.json({ success: true });
      } else {
          res.json({ success: false, msg: "Invalid username or password" });
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
        const result=await db.query(
            "update busss set username=$1,password=$2 where username=$3 AND password=$4",
            [re_username,re_password,username,password] 
        );
        if (result){
            res.json({ save: true });

        }
    }
    catch(err){
        res.status(500).json({save:false, msg:"e"});
    }
})

// Start Server
app.listen(port, () => {
    console.log(` Server running on http://localhost:${port}`);
});