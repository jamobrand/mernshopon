const router = require('express').Router();
const Category = require('../models/category');

/* Get Categories */
router.get('/api/admin/categories', (req, res, next) => {
  Category.find()
  .then(categories => res.json({
    success: true,
    categories: categories
  }))
});

/* Post Category */
router.post('/api/admin/categories/add-category', (req, res, next) => {
  Category.findOne({ title: req.body.title }, function(err, existingCategory) {
    if (existingCategory) {
      res.status(404).json({
        success: false,
        message: 'Category with that title exists'
      });
    } else {
      const newCategory = new Category({
        title: req.body.title
      });
      newCategory.save().then(category => res.json({
        success: true,
        message: 'Category Added'
      }));
    }
  });
});

/* Edit Category */
router.put('/api/admin/categories/edit-category/:id', (req, res, next) => {
  const title = req.body.title;
  const id = req.params.id;

  Category.findOne({ title: title, _id: {'$ne': id}}, function(err, category) {
    if (category) {
      res.status(409).json({
        success: false,
        message: 'Category with that title exists, choose another'
      });
    } else {
      Category.findById(id, function(err, category) {
        category.title = req.body.title;
        category.save().then(category => res.json({
          success: true,
          message: 'Category Edited'
        }));
      });
    }
  });
});

/* Delete Category */
router.delete('/api/delete-category/:id', (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => category.remove()
    .then(() => res.json({ success: true, message: 'Category Deleted'})))
    .catch(err => res.status(404).json({ success: false, message: 'Category not Deleted'}))
});

module.exports = router;
