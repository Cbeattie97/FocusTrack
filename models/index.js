// Sequelize models
const User = require('./User');
const Task = require('./Task');
const Tag = require('./Tag');
const TaskAssignee = require('./TaskAssignee');
const TaskTag = require('./TaskTag');


User.hasMany(Task, {
    foreignKey: 'user_id',
});

Task.belongsTo(User, {
    foreignKey: 'user_id'
});

Task.belongsToMany(Tag, {
    through: {
        model: TaskTag,
        unique: false
    },
    as: 'task_tags'
});

Tag.belongsToMany(Task, {
    through: {
        model: TaskTag,
        unique: false
    },
    as: 'tag_tasks'
});

Task.belongsToMany(User, {
    through: {
        model: TaskAssignee,
        unique: false
    },
    as: 'task_users'
});

User.belongsToMany(Task, {
    through: {
        model: TaskAssignee,
        unique: false
    },
    as: 'user_tasks'
});

module.exports = { User, Task, Tag, TaskTag, TaskAssignee };
