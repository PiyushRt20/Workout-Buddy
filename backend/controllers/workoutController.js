const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');


//get all workouts
exports.getAllWorkouts = async(req, res)=>{
    const user_id = req.user._id;
    const workouts = await Workout.find({user_id}).sort({createdAt: -1});
    if(!workouts){
        return res.status(404).json({error: "No workouts found"});
    }
    res.status(200).json(workouts);
}

//get a single workout by id
exports.getWorkout = async(req, res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found"});
    }
    const workout = await Workout.findById(id);
    if(!workout){
        return res.status(404).json({error: "No workout found"});
    }
    res.status(200).json(workout);
}

//create a new workout
exports.createWorkout = async (req, res) => {

    const { title, load, reps } = req.body;

    let emptyFields = [];
    if(!title){
        emptyFields.push('title')
    }else if(!load){
        emptyFields.push('load')
    }else if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error : "Please fill all the fields", emptyFields});
    }

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({title, load, reps, user_id});
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//delete a workout by id

exports.deleteWorkout = async(req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found"});
    } 
    const workout = await Workout.findByIdAndDelete(id);
    if(!workout){
        return res.status(404).json({error: "No workout found"});
    }
    res.status(200).json(workout);  
}

//update a workout by id
exports.updateWorkout = async(req, res)=>{
    const {id}  = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found"});
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{...req.body}, {new: true});
    if(!workout){
        return res.status(404).json({error: "No workout found"});
    }
    res.status(200).json(workout);
}