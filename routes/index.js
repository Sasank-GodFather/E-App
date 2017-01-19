var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
var nodemailer = require('nodemailer');
var twilio = require('twilio');

router.get('/', function(req, res, next) {
    
    var client = twilio('AC1663fed9e0e1f14e06020eef22722aa5','5b3aa96f2a9d0ce6eae947d9ee5376eb');
            client.sendMessage({
                to: '+917396022905',
                from: '+13613563921',
                body: 'Your product is here..!!'
            });
    
    var successMsg = req.flash('success')[0];
    Product.find().distinct('category', function (err, results) {
        console.log(JSON.stringify(results));
        res.render('shop/index', {categories: results, successMsg: successMsg, noMessage: !successMsg});
    });

});


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


router.get('/monitors', function(req, res, next) {
    Product.find({ category : "monitors"},function (err, docs) {
        var chunks = [];
        var chunkSize = 3;
        for (var i=0; i < docs.length; i+= chunkSize) {
            chunks.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/products', {products: chunks });
    });
});

router.get('/mobiles', function(req, res, next) {
    Product.find({ category : "mobiles"},function (err, docs) {
        var chunks = [];
        var chunkSize = 3;
        for (var i=0; i < docs.length; i+= chunkSize) {
            chunks.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/products', {products: chunks });
    });
});

router.get('/camera', function(req, res, next) {
    Product.find({ category : "camera"},function (err, docs) {
        var chunks = [];
        var chunkSize = 3;
        for (var i=0; i < docs.length; i+= chunkSize) {
            chunks.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/products', {products: chunks });
    });
});

router.get('/television', function(req, res, next) {
    Product.find({ category : "television"},function (err, docs) {
        var chunks = [];
        var chunkSize = 3;
        for (var i=0; i < docs.length; i+= chunkSize) {
            chunks.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/products', {products: chunks });
    });
});

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        req.flash('success', 'product added to the cart!!');
        res.redirect(req.get('referer'));
    });
});

router.get('/shopping-cart', function(req, res, next) {
    if(!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    else {
        var cart = new Cart(req.session.cart);
        res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
    }
});

router.get('/checkout', function(req, res, next) {
    if(!req.session.cart) {
        return res.redirect('/');
    }
    else {
        var cart = new Cart(req.session.cart);
        var errMsg = req.flash('error')[0];
        res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
    }
});

router.post('/checkout', function(req, res, next) {
    if(!req.session.cart) {
        return res.redirect('/');
    }
    var cart = new Cart(req.session.cart);
    
    var stripe = require("stripe")(
        "sk_test_RDSIEn7Gb5Hnv95PkwjR1MWI"
    );
    stripe.charges.create({
        amount: /*cart.totalPrice * 100*/ 2000,
        currency: "usd",
        source: req.body.stripeToken , // obtained with Stripe.js
        description: "Charge for e-commerce-app"
    }, function(err, charge) {
        // asynchronously called
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/');
        }
        
        var order = new Order({
            custName: req.body.name,
            custAddress: req.body.address,
            custNumber: req.body.phonenumber,
            custEmail: req.body.email,
            cart: cart,
            paymentId: charge.id
        });
        
        
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    });
});

router.get('/track-order',function(req, res, next) {
    res.render('shop/track-order');
});

router.post('/track-order',function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phonenumber;
    
    Order.find({custName: name, custEmail:  email, custNumber: phone}, function(err, user){
        if(!user) {
            res.render('shop/track-order',{noUser: true, yesUser: false});
        }
        else {
            var transporter = nodemailer.createTransport({
                service: 'smtp.mailgun.org',
                auth: {
                    user: 'postmaster@appa9c6bf2f9dfb4ba1b6578b76c0b45632.mailgun.org',
                    pass: 'bdcf696ee3c00ab05f83ca5bea6a38bc '
                }
            });
            
            var mailOptions = {
                from: 'E-Commerce <postmaster@appa9c6bf2f9dfb4ba1b6578b76c0b45632.mailgun.org>',
                to: email,
                subject: 'Track Your Order',
                text: 'Your order: ',
                html: '<a href="www.google.com"> Click here to track your order</a>'
            };
            
            transporter.sendMail(mailOptions, function(err, info){
                if(err) {
                    console.log(err);
                    res.redirect('/');
                }
                else {
                    console.log('Message Sent!!');
                    res.redirect('/');
                }
            });
           
        }
    });
});

router.get('/searchthis/:search', function(req, res, next){
    var search = req.params.search;
   Product.find({ item : search},function (err, docs) {
        var chunks = [];
        var chunkSize = 3;
        for (var i=0; i < docs.length; i+= chunkSize) {
            chunks.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/products', {products: chunks });
    });
    
});

module.exports = router;