import express from "express"
import cors from "cors"
import mysql from "mysql"

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' , methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin",
    database:"test"
    
})
app.listen(8800, () => {
    console.log("Listening");
})
app.get('/user',(req,res)=>{
    const q="SELECT * FROM user";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    });
});
app.post('/user',(req,res)=>{
    const q= "INSERT into user (`id`, `Name`, `email`) VALUES (?)";
    const values = [
        req.body.id,
        req.body.Name,
        req.body.email,
        
      ];
    
      db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data); });
});

app.delete("/user/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM user WHERE id = ?";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});


app.put("/user/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE user SET `Name`= ?, `email`= ? WHERE id = ?";
  
    const values = [
      req.body.Name,
      req.body.email,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
