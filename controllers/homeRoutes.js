
const router = require('express').Router();
const { User, Task } = require('../models'); 
const withAuth = require('../utils/auth'); 

// GET the landing page
router.get('/', async (req, res) => {
    //Check if the user is logged on, if so redirect to tasks, otherwise show the login page
    if (req.session.logged_in) {
        res.redirect('/tasks');
        return;
    } else {
        res.redirect('/login');
    }
});

// GET the login page
router.get('/login', (req, res) => {
    // If authentication is enabled, check session status
    if (req.session.logged_in) {
         res.redirect('/tasks');
         return;
    }

    res.render('login');
});

// GET the main tasks page after login
router.get('/tasks',  withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Task }],
        });

        const user = userData.get({ plain: true });
        const tasks = user.tasks; // Extract tasks

        // Group tasks by status
        const todoTasks = tasks.filter(task => task.status === 'Todo');
        const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
        const completedTasks = tasks.filter(task => task.status === 'Completed');
        console.log(todoTasks);
        console.log(inProgressTasks);
        console.log(completedTasks);

        //res.render('tasks', {
        //    tasks,
        //    logged_in: req.session.logged_in
        //});
        res.render('tasks', {
            todoTasks,
            inProgressTasks,
            completedTasks,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET the page to display and manage tasks dynamically
router.get('/drawDownTasks', withAuth, async (req, res) => {
    try {
        const taskData = await Task.findAll({
        });

        const tasks = taskData.map(task => task.get({ plain: true }));

        res.render('drawDownTasks', { tasks }); 
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

