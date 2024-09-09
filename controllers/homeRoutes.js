const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// GET the landing page
router.get('/', async (req, res) => {
    try {

        res.render('login', {
            // TODO logged_in: req.session.logged_in,
        });
    } catch (err) {
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