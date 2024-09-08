const router = require('express').Router();
const userRoutes = require('./user-routes');
const taskRoutes = require('./task-routes');
const tagRoutes = require('./tag-routes');

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
