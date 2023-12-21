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
    const q= "INSERT into user (`Name`, `email`, `password`,`DateOfBirth`,`Gender`,`ContactInformation`,`type`) VALUES (?)";
    const values = [
        req.body.Name,
        req.body.email,
        req.body.password,
        req.body.DateOfBirth,
        req.body.Gender,
        req.body.ContactInformation,
        req.body.type,
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
    const q = "UPDATE user SET `Name`= ?, `email`= ?,  `password`=?  WHERE id = ?";
  
    const values = [
      req.body.Name,
      req.body.email,
      req.body.password,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    const values = [email, password];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const user = results[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Authentication successful, you may generate and send a token here

       
        return res.json(results);
    });
});
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const q = 'SELECT * FROM user WHERE id = ?';

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const user = data[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  });
});


app.get('/college',(req,res)=>{
  const q="SELECT * FROM colleges";
  db.query(q,(err,data)=>{
      if(err) return res.json(err)
      return res.json(data);
  });
});

app.post('/api/apply',(req,res)=>{
  const q= "INSERT into status (`UserId`, `SchoolID`,`SubmissionDate`,`ReviewStatus`) VALUES (?)";
  const values = [
      req.body.uid,
      req.body.cid,
      req.body.sdate,
      req.body.status,
      
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data); });
});

app.delete('/api/withdraw', (req, res) => {
  const collegeId = req.query.collegeId;
  const userId = req.query.userId;
  const q = 'DELETE FROM status WHERE SchoolID = ? AND UserId = ?';;

  db.query(q, [collegeId,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});