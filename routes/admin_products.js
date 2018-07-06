const router = require('express').Router();
const Product = require('../models/product');
const Category = require('../models/category');


/* Get Products */
router.get('/api/admin/products', (req, res) => {
  Product.find()
  .then(products => res.json({
    success: true,
    product: products
  }))
});

/* Post Products */
router.post('/api/admin/products/add-product', (req, res) => {
  var title = req.body.title;
  var desc = req.body.desc;
  var price = req.body.price;
  var category = req.body.category;

  Product.findOne({ title: title }, function(err, existingProduct) {
    if (existingProduct) {
      res.status(409).json({
        success: false,
        message: 'Product with that title exists'});
      //Category.find({}, function(err, categories) {});
    } else {
      const newProduct = new Product({
        title: title,
        desc: desc,
        price: price,
        category: category
      });
      newProduct.save().then(product => res.json({
        success: true,
        message: 'Product Added'
      }));
    }
  });
});

/* Edit Product*/
router.put('/api/admin/products/edit-product/:id', (req, res) => {
  Category.find({}, function(err, categories) {
    Product.findById(req.params.id, function(err, product) {
    });
  });

  var title = req.body.title;
  var price = req.body.price;
  var desc = req.body.desc;
  var category = req.body.category;
  var id = req.params.id;

  Product.findOne({ title: title, _id: {'$ne': id}}, function(err, product) {
    if (product) {
      res.status(404).json({
        success: false,
        message: 'Category with that title exists, choose another'});
    } else {
      Product.findById(id, function(err, product) {
        product.title = title;
        product.price = price;
        product.desc = desc;
        product.category = category;
        product.save().then(product => res.json({
          success: true,
          message: 'Product Edited'
        }));
      });
    }
  });
});

/* Delete Product */
router.delete('/api/delete-product/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ success: true, message: 'Product Deleted'})))
    .catch(err => res.status(404).json({ success: false, message: 'Product not Deleted'}))
});

module.exports = router;
