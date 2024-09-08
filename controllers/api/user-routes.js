const router = require('express').Router();
const { User } = require('../../models');

// The `/api/users` endpoint

router.get('/', async (req, res) => {
    // find all users
    try {
        const userData = await User.findAll({
            // include: [{ model: }],
            attributes: { exclude: ['password_hash'] }
        }).catch((err) => {
            res.json(err);
        });

        // const users = userData.map((user) => user.get({ plain: true }));
        // res.render('homepage', { users });
        res.status(200).json(userData);

    } catch {
        res.status(500).json({ message: 'Error retreiving users' });
    }
});

router.get('/:id', async (req, res) => {
    // find a single user by id
    try {
        const userData = await User.findByPk(req.params.id, {
            // include: [{ model: Product }],
            attributes: { exclude: ['password_hash'] },
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }

        // const users = userData.get({ plain: true });
        // res.render('homepage', { users });
        res.status(200).json(userData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new user
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password_hash: req.body.password_hash, // TODO: hash password
        });

        res.status(200).json(userData);

    } catch (err) {
        res.status(400).json({ message: 'Error creating user' });
    }
});

router.put('/:id', async (req, res) => {
    // update a user name by its id value
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
    
        if (!userData[0]) {
            res.status(404).json({ message: 'No tag found with that id!' });
            return;
        }
    
        res.status(200).json(userData);
    
    } catch (err) {
        res.status(400).json(err);
    }
});

// ? should be able to delete via username or email?
router.delete('/:id', async (req, res) => {
    // delete a user by id
    try {
        const userData = await User.destroy({
            where: {
            id: req.params.id,
            },
        });
    
        if (!userData) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }
    
        res.status(200).json(userData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;