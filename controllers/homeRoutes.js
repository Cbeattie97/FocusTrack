
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
        res.render('tasks', {
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

