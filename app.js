const express = require('express');
const app = express();
const {connectDb} = require('./db/dbconfig');
// Dotenv configuration
require('dotenv').config();



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
const applicationRoute = require('./routes/applicationRoute');

app.use('/api/auth', userRoute);
app.use('/api/job',jobRoute);
app.use('/api',applicationRoute)


app.listen(3000,() => {
require('./adminSeed')();
console.log('server is running on port 3000');
})
