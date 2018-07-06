const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/secret');

const app = express();

mongoose.connect(config.database, { useNewUrlParser: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Mongodb Connected');
  }
});

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const adminCategories = require('./routes/admin_categories');
const adminProducts = require('./routes/admin_products');

app.use(adminCategories);
app.use(adminProducts);


const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('App running on 5000');
  }
});
