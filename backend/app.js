const express = require('express');
const app = express();
const {connectDb} = require('./db/dbconfig');
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// Dotenv configuration
require('dotenv').config();



app.use(express.json());

connectDb();


const userRoute = require('./routes/userRoute');
const jobRoute = require("./routes/jobRoute");
const applicationRoute = require('./routes/applicationRoute');
const paymentRoute = require('./routes/paymentRoute');
const userProfileRoute = require('./routes/userProfileRoute');

app.use('/api/auth', userRoute);
app.use('/api/job',jobRoute);
app.use('/api',applicationRoute);
app.use('/api',paymentRoute);
app.use('/api/profile',userProfileRoute);

app.listen(3000,() => {
require('./adminSeed')();
console.log('server is running on port 3000');
})
