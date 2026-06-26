const express = require('express');
const Workout = require('../models/workoutModel');
const router = express.Router();
const { createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

//require auth for all workout routes
router.use(requireAuth);

/**
 * Route : /api/workouts
 * Method : GET
 * Description : Get all workouts
 * Access : Public
 * Parameters : None
 */
router.get('/', getAllWorkouts);

/**
 * Route : /api/workouts/:id
 * Method : GET
 * Description : Get a single workout by id
 * Access : Public
 * Parameters : Id
 */
router.get('/:id',getWorkout);  

/**
 * Route : /api/workouts
 * Method : POST
 * Description : create / add a new workout
 * Access : Public
 * Parameters : None
 */
router.post('/',createWorkout);   


/**
 * Route : /api/workouts/:id
 * Method : DELETE
 * Description : delete a workout by id
 * Access : Public
 * Parameters : id
 */
router.delete('/:id',deleteWorkout);   


/**
 * Route : /api/workouts/:id
 * Method : PATCH
 * Description : update a workout by id
 * Access : Public
 * Parameters : id
*/
router.patch('/:id', updateWorkout);


module.exports = router;