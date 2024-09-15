const router = require('express').Router();
const { Task, TaskAssignee } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/tasks` endpoint

router.post('/', withAuth, async (req, res) => {
    // create a new task
    try {
        console.log('Received task data:', req.body);
        const newTask = await Task.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newTask);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    // update a task by its id value
    try {
        const taskData = await Task.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!taskData[0]) {
            res.status(404).json({ message: 'No task found with this id!', success: false });
            return;
        }

        res.status(200).json({ message: 'Task updated successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', success: false, error: err.message });
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    // delete a task by its id value
    try {
        const taskData = await Task.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!taskData) {
            res.status(404).json({ message: 'No task found with this id!', success: false });
            return;
        }

        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', success: false, error: err.message });
    }
});

module.exports = router;