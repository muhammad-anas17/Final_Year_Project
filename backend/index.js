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
    const q= "INSERT into user (`Name`, `email`, `password`,`ContactInformation`,`type`) VALUES (?)";
    const values = [
        req.body.Name,
        req.body.email,
        req.body.password,
        req.body.ContactInformation,
        req.body.type,
   ];
    
      db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data); });
});


app.post('/api/getid', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT id FROM user WHERE email = ? AND password = ?';
  const values = [email, password];

  db.query(query, values, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      const userId = results[0].id;

      // Send the id in the response
      return res.json({ id: userId });


  });
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


app.post('/student',(req,res)=>{
  const q= "INSERT into student (`UserID`, `DOB`,`gender`) VALUES (?)";
  const values = [
      req.body.userid,
      req.body.DateOfBirth,
      req.body.Gender,
 ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data); });
});

app.post('/grades',(req,res)=>{
  const q= "INSERT into grades (`userID`, `math_grade`,`english_grade`,`urdu_grade`,`Pak_studies_grade`,`islamiat_grade`,`optional_subject1_name`,`optional_subject1_grade`,`optional_subject2_name`,`optional_subject2_grade`,`optional_subject3_name`,`optional_subject3_grade`,`optional_subject4_name`,`optional_subject4_grade`) VALUES (?)";
  const values = [
      req.body.userid,
      req.body.Math,
      req.body.Eng,
      req.body.Pak,
      req.body.Urdu,
      req.body.Isl,
      req.body.Sub1,
      req.body.Sub1Grade,
      req.body.Sub2,
      req.body.Sub2Grade,
      req.body.Sub3,
      req.body.Sub3Grade,
      req.body.Sub4,
      req.body.Sub4Grade,
 ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data); });
});

app.post('/college',(req,res)=>{
  const q= "INSERT into colleges (`userID`,`name`,`area`,`number_of_A`,`number_of_B`,`number_of_C`,`number_of_D`,`number_of_E`) VALUES (?)";
  const values = [
      req.body.userid,
      req.body.name,
      req.body.area,
      req.body.nA,
      req.body.nB,
      req.body.nC,
      req.body.nD,
      req.body.nE,
 ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data); });
});


app.get('/api/college/:id', (req, res) => {
  const userId = req.params.id;
  const q = 'SELECT * FROM colleges WHERE userID = ?';

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




app.post('/form', (req, res) => {
  const q = "INSERT into questions (`CollegeID`, `QuestionText`) VALUES ?";
  const values = req.body;

  db.query(q, [values], (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(data);
  });
});


app.get('/api/status/:id', (req, res) => {
  const userId = req.params.id;
  console.log('userId:', userId);

  const q = 'SELECT * FROM status WHERE SchoolID = ?';

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

// fetch grades for each user

app.get('/api/grades/:id', (req, res) => {
  const userId = req.params.id;
  console.log('userId:', userId);

  const q = 'SELECT * FROM grades WHERE userID = ?';

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