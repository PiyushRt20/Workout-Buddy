// import express
const express = require('express');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workout');

dotenv.config();

// create an express app
const app = express();


//middleware
app.use(express.json());
app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next()
})
//Route 
app.get('/', (req, res)=>{
    res.json({
        message: "Welcome to your application"
    })
})

app.use('/api/workouts', workoutRoutes);

//connect to database
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    //listen for requests
    app.listen(PORT, ()=>{
        console.log(`Server is running at http://localhost:${PORT} and connected to database`);
    })
})
.catch((error)=>{console.log(error)});

//Port
const PORT = process.env.PORT;

