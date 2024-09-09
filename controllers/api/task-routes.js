const router = require('express').Router();
const { Task } = require('../../models');

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

router.post('/', async (req, res) => {
    // create a new task
    try {
        const taskData = await Task.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
        });

        res.status(200).json(taskData);

    } catch (err) {
        res.status(400).json({ message: 'Error creating task' });
    }
});

router.put('/:id', async (req, res) => {
    // update a task by its id value
    try {
        const taskData = await Task.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
    
        if (!taskData[0]) {
            res.status(404).json({ message: 'No task found with that id!' });
            return;
        }
    
        res.status(200).json(taskData);
    
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete a task by its id
    try {
        const taskData = await Task.destroy({
            where: {
            id: req.params.id,
            },
        });
    
        if (!userData) {
            res.status(404).json({ message: 'No task found with that id!' });
            return;
        }
    
        res.status(200).json(taskData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;