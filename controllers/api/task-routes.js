const router = require('express').Router();
const { Task, TaskAssignee } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/tasks` endpoint

router.get('/', async (req, res) => {
    // find all tasks
    try {
        const taskData = await Task.findAll({
            // TODO include: [{ model: }],
        }).catch((err) => {
            res.json(err);
        });

        // TODO const tasks = taskData.map((task) => task.get({ plain: true }));
        // res.render('homepage', { tasks });
        res.status(200).json(taskData);

    } catch {
        res.status(500).json({ message: 'Error retreiving users' });
    }
});

router.get('/:id', async (req, res) => {
    // find a single task by id
    try {
        const taskData = await Task.findByPk(req.params.id, {
            //TODO include: [{ model: Product }],
        });

        if (!taskData) {
            res.status(404).json({ message: 'No task found with that id!' });
            return;
        }

        // TODO const tasks = taskData.get({ plain: true });
        // res.render('homepage', { tasks });
        res.status(200).json(taskData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
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