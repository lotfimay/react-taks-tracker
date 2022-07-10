const express = require('express');
const tasksController = require('../controllers/taskController');

const router = express.Router();


router.get('/' , tasksController.all_tasks);
router.get('/:task_id' , tasksController.task_by_id);
router.post('/' , tasksController.add_task);
router.delete('/:task_id' , tasksController.delete_task);
router.patch('/update_reminder/:task_id', tasksController.update_task_importance);



module.exports = router;