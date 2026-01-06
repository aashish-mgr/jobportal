const express = require('express');
const app = express();
const {connectDb} = require('./db/dbconfig');

app.use(express.json());

connectDb();
 
app.get('/', (req,res) => {
  res.send('hello')
})

app.get('/home', (req,res) => {
    res.send("this is homepage")
})

app.post('/home', (req,res) => {
  console.log(req.body);
  res.send("This is response to post");
})

const userRoute = require('./routes/userRoute');
const jobRoute = require("./routes/jobRoute");

app.use('/api/auth', userRoute);
app.use('/api/job',jobRoute);


app.listen(3000,() => {
console.log('server is running on port 3000');
})