// controllers/pomodoroController.js
const express = require('express');
const router = express.Router();

// Route to render the Pomodoro timer view
router.get('js/pomodoro', (req, res) => {
    // Render the view with any initial data if needed
    res.render('pomodoro', { remainingTime: 1500 }); // Example duration
});

module.exports = router;

// TODO fix timer functionality