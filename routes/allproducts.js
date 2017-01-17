var express = require('express');
var router = express.Router();
var Product= require('../models/product');

router.get('/allproducts', function(req, res, next) {
    Product.find(function (err, docs) {
        var chunks = [];
        var chunkSize = 3;
        for (var i=0; i < docs.length; i+= chunkSize) {
            chunks.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/products', {products: chunks });
    });
});

module.exports = router;
