const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      }
    ]
  })
  .then(tags => res.json(tags))
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
  });

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'products'
      }
    ]
  })
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tag);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
  });

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tag => res.status(201).json(tag))
  .catch(err => {
    console.error(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
Tag.update(req.body, {
  where: {
    id: req.params.id
  }
})
.then(tag => {
  if (!tag[0]) {
    res.status(404).json({ message: 'No tag found with this id to update' });
    return;
  }
  res.json({ message: 'Tag updated successfully' });
})
.catch(err => {
  console.error(err);
  res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleted => {
    if (!deleted) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json({ message: 'Tag deleted' });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

module.exports = router;
