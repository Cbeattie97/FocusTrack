const router = require('express').Router();
const { Tag } = require('../../models');

// The `/api/tags` endpoint

router.post('/', async (req, res) => {
  // create a new tag
    try {
        const tagData = await Tag.create({
            name: req.body.name,
        });

        res.status(200).json(tagData);

    } catch (err) {
        res.status(400).json({ message: 'Error creating tag' });
    }
});

router.put('/:id', async (req, res) => {
  // update a tags name by its id value
    try {
        const tagData = await Tag.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!tagData[0]) {
            res.status(404).json({ message: 'No tag found with that id!' });
            return;
        }

        res.status(200).json(tagData);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its id
    try {
        const tagData = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!tagData) {
            res.status(404).json({ message: 'No tag found with that id!' });
            return;
        }

        res.status(200).json(tagData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;