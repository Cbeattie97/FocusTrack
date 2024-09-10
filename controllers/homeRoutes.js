// TODO: uncomment middleware for authentication

const router = require('express').Router();
const { User, Task } = require('../models'); 
// const withAuth = require('../utils/auth'); 

// GET the landing page
router.get('/', async (req, res) => {
    try {
        // Redirect to tasks page directly for now, without auth check
        res.redirect('/tasks');
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET the login page
router.get('/login', (req, res) => {
    // If authentication is enabled, check session status
    // if (req.session.logged_in) {
    //     res.redirect('/tasks');
    //     return;
    // }

    res.render('login');
});

// GET the main tasks page after login
router.get('/tasks', /* withAuth, */ async (req, res) => {
    try {
        res.render('tasks'); 
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET the page to display and manage tasks dynamically
router.get('/drawDownTasks', /* withAuth, */ async (req, res) => {
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

