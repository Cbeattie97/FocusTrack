const router = require('express').Router();
const withAuth = require('../utils/auth');

// GET the landing page
router.get('/', async (req, res) => {
    try {
        res.render('homepage', { users });
    } catch {
        res.status(500).json({ message: 'Error retreiving users' });
    }
});

router.get('/tasks', async (req, res) => {
    try {
        res.render('tasks');
    } catch {
        res.status(500).json(err);
    }
});

// GET the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;