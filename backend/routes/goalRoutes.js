const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const { set } = require('mongoose')
const { protect } = require('../middleware/authMiddleware')



router.route('/').get(protect, getGoals).post(protect, setGoal)


// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)
//They have the same route, so can be written as this
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router