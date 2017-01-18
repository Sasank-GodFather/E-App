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



router.get('/add', function(req, res, next) {
    
    var product =[{"_id":3.0,"category":"monitors","item":"LG","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/41RUub7ltFL.jpg","description":"The monitor is a great solution as it also has HDMI connector which is not available an easily available features.","price":"5500"}
,{"_id":4.0,"category":"monitors","item":"AOC","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/614BdRc31gL._SL1500_.jpg","description":"The AOC E1670SWU is a 15.6 inch LED monitor that comes with a HD Resolution and has a very compact and elegant design.","price":"4100"}
,{"_id":5.0,"category":"monitors","item":"DELL","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/41e1g%2BR2rUL.jpg","description":"The monitor has an LED display with a high resolution screen measuring 18.5 inches and comes with a resolution of 1366x768 pixels.","price":"4900"}
,{"_id":6.0,"category":"monitors","item":"ACER","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/41Zwe-fBQzL.jpg","description":"Acer S Series monitors are very slim yet spacious displays that are great for multitasking and web browsing.","price":"4009"}
,{"_id":7.0,"category":"monitors","item":"MICROMAX","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/51pyr%2BSbKFL.jpg","description":"Monitor Type : LED Size : 15-18.9 Warranty : 3 Years Manufacturer Warranty Colour : Black Features : HD Other Features : Kensington Lock","price":"4999"}
,{"_id":9.0,"category":"monitors","item":"BENQ","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/41Nc19ugHbL.jpg","description":"The GW2470H VA LED monitor brings viewing pleasure to everyday work and play with exquisite details on the exterior and striking visual performance delivered by 3000:1 high contrast ratio.","price":"10100"}
,{"_id":10.0,"category":"mobiles","item":"OnePlus 3T","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/81Fxhg8a%2BZL._SL1500_.jpg","description":"OnePlus 3T delights you with blazing fast performance and premium design, stuff that makes it a top choice in the premium smartphone segment","price":"29999"}
,{"_id":11.0,"category":"mobiles","item":"OnePlus 3","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/915Buzx7ZhL._SL1500_.jpg","description":"A stylish smartphone with what is arguably one of the best Android cameras available at the moment. It is a flagship in every sense.","price":"27999"}
,{"_id":12.0,"category":"mobiles","item":"OnePlus 2","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/818fbX6mQkL._SL1500_.jpg","description":"When you vow to Never Settle, you can’t cut any corners. The Qualcomm Snapdragon 810 processor, featuring 4G LTE and an octa-core CPU, effortlessly powers through demanding apps, games, and HD video. Paired with a 3,300 mAh battery, your OnePlus 2 will stay charged through even the busiest of days.","price":"19999"}
,{"_id":13.0,"category":"mobiles","item":"VIVO V5","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/5124htTcPUL._SL1280_.jpg","description":"20MP front selfie Moonlight Camera for a perfect selfie with 4GB RAM and 32GB Internal Memory.","price":"17445"}
,{"_id":14.0,"category":"mobiles","item":"Samsung Galaxy J7 Prime","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/31%2BjHSsqlsL.jpg","description":"Samsung Galaxy J7 Prime SM-G610F Smart Phone, Gold features an elegant curved back and flush rear camera. It boasts a compact body that fits comfortably in your hand and also features an Ultra Power Saving mode for more efficient battery usage. Three card slots ensure you can use two SIM cards and one microSD card at once.","price":"16890"}
,{"_id":15.0,"category":"mobiles","item":"Apple iPhone 7","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/51C4mWN69QL.jpg","description":"For all the iPhone lovers, Apple brings you the best yet. The iPhone 7 improvises on the best features of the previous generations of Apple phones.","price":"64799"}
,{"_id":16.0,"category":"mobiles","item":"Apple iPhone 6","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/61eihG04VZL._SL1000_.jpg","description":"Enjoy larger and brighter display with the 4.7-inch Retina HD Display of the iPhone 6 by Apple. The screen has IPS (In-plane Switching) technology which refines the display quality of the viewed content.","price":"36999"}
,{"_id":17.0,"category":"mobiles","item":"Apple iPhone 5s","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/71yZcobCGpL._SL1500_.jpg","description":"The meticulously conceived and preciously crafted Apple iPhone 5s is designed for those who prefer quality and style. This next generation iPhone has a remarkably thin and lightweight design and is packed with superior features and high tech apps that enhance the overall Smartphone using experience.","price":"19798"}
,{"_id":18.0,"category":"mobiles","item":"Oppo F1S","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/71VrQ-MqwLL._SL1500_.jpg","description":"The OPPO F1s uses a front beauty camera with a 1/3.1-inch sensor and an F/2.0 aperture. This allows for more light to enter the camera, and enhances its sensitivity. So you can take natural-looking selfies even in low-light conditions.","price":"16990"}
,{"_id":19.0,"category":"mobiles","item":"Sony Xperia XA Dual","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/71TJGukxEhL._SL1500_.jpg","description":"The edge to edge display and perfect size fits snugly in your hand. And its camera starts really quick, and fast hybrid auto focus is made for sharp-vivid photos. Sun goes down? The 13MP back and 8MP front cameras work great in low light with wide angle.","price":"15485"}
,{"_id":20.0,"category":"mobiles","item":"HTC Desire 10 Lifestyle","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/819IJJQHCHL._SL1500_.jpg","description":"HTC Desire 10 lifestyle gives you more space for the things that are important with a massive 3GB of RAM and 32GB storage space. So you can load up on photos, videos, movies, games and more. And if that’s not enough room, HTC Desire 10 lifestyle has SD card support for up to 2TB expandable memory.","price":"15990"}
,{"_id":21.0,"category":"camera","item":"Canon","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/41VA-%2BYM1VL.jpg","description":"Canon EOS 1200D 18MP Digital SLR Camera with 18-55mm and 55-250 mm IS Lens is easy to use and it delivers results that you will love for sure.","price":"27499"}
,{"_id":22.0,"category":"camera","item":"Nikon","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/41yr2pJPYEL.jpg","description":"Featuring a 24.2 megapixel DX-format CMOS sensor and Nikon’s EXPEED 3 image processor, the Nikon D3200 is an ideal camera for first time DSLR owners because of its easy functionality and uncompromised image quality. ","price":"31567"}
,{"_id":23.0,"category":"camera","item":"Sony","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/91LouOXrmCL._SL1500_.jpg","description":"Forget everything you knew about autofocus. With Sony's state-of-the-art 4D Focus, you'll be able to capture every moving subject with astonishing clarity like never before. The 4D Focus combines fast autofocus speed, wide coverage and steadfast tracking through a sophisticated AF algorithm. ","price":"99990"}
,{"_id":24.0,"category":"camera","item":"Pentax","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/61JyTyfOy2L._SL1000_.jpg","description":"Throughout more than 50 years as a leading SLR camera manufacturer, Pentax has always thought very seriously about this question and developed the original technologies to provide good answers. It’s a history of never-ending innovation and evolution. Based on its experiences and expertise accumulated over these years, Pentax now has the final answer a new 35mm full-frame digital SLR camera named Pentax K-1.","price":"157000"}
,{"_id":25.0,"category":"camera","item":"Panasonic","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/51GkGwKtLQL.jpg","description":"Key Features of Panasonic DMC-GH3H Advance Point and shoot Camera 16.05 Megapixel Camera Full HD Recording 62 mm Filter Attachment Size 35 mm Equivalent Focal Length: 28 - 280 mm Live MOS Image Sensor 3 inch OLED Screen f/4 - f/5.8 Aperture Specifications of Panasonic DMC-GH3H Advance Point and shoot Camera General Brand Panasonic Type Advance Point and shoot Model ID DMC-GH3H Dimension Weight 550 g ","price":"143191"}
,{"_id":26.0,"category":"camera","item":"Neewer","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/71YPEWxhegL._SL1500_.jpg","description":"Features It is consisted of 32 pieces of LED of high brightness and the average color temperature is 5500k It could flash or provide the continuous light. The flash range is adjustable the flash exposure compensation could be set to be +3EV or -3EV and thus it is especially suitable for macro photography With the function of pre-flash it is easy for you to judge the brightness of the light.","price":"2299"}
,{"_id":28.0,"category":"camera","item":"Fujifilm","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/91kgAAT65cL._SL1500_.jpg","description":"Do you love capturing all your special moments and make them forever? Are your trips and vacations incomplete without photos? Are you looking for a camera that delivers instant copies of your photos? Fujifilm brings you the Instax Mini 8 which will your tours more fun and exciting.","price":"4895"}
,{"_id":29.0,"category":"television","item":"Samsung","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/51R7%2ByL8UUL.jpg","description":"The Samsung EB40D HD Ready LED TV is an effective appliance that enriches your multimedia experience and enables you to enjoy high quality visuals. Armed with 40 inch screen and IPS Panel that provides clear and detailed images, this TV comes with effective connectivity features like USB and Wi-Fi.","price":"33333"}
,{"_id":30.0,"category":"television","item":"Panasonic","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/413oG-rjN3L.jpg","description":"The Panasonic TH-50C300DX 127 cm (50-inch) Full HD LED TV features a wide Plasma display panel that exhibits stunning clarity and fine details with the high 1920 x 1080 pixels resolution. The full HD screen showcases an exceptional total quantum of 2,070,000 pixels to bring alive your movies, television shows, games, music and videos in realistic details, effervescent colours and excellent contrast.","price":"46999"}
,{"_id":32.0,"category":"television","item":"LG","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/51%2BE%2BVemijL.jpg","description":"1) FULL HD LED TV 2) SMART TV 3) MIRACAST \u0026 NETFLIX 4) YOUTUBE 5) 1 USB INPUT \u0026 1 HDMI PORT","price":"40860"}
,{"_id":33.0,"category":"television","item":"TCL","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/91TLYcIervL._SL1500_.jpg","description":"Smart because it’s an easier, faster, and more intelligent way to surf content on a single device or across multiple devices, with upgraded functions like screen mirroring, built in Wi-Fi, app store and much more.","price":"34990"}
,{"_id":34.0,"category":"television","item":"Sanyo","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/81hMYvOgn5L._SL1500_.jpg","description":"Experience stunning picture quality with sharp images and vivid colours at 1920x1080 high definition resolution on Sanyo TVs.","price":"34990"},{"_id":35.0,"category":"television","item":"SONY","qty":50.0,"url":"http://ecx.images-amazon.com/images/I/612MY126NQL._SL1500_.jpg","description":"Sony 108 cm (43 inches) BRAVIA KDL-43W800D Full HD 3D Android LED TV. X-RealityTM PRO: Rediscover every detail Discover a thrilling world of extraordinary clarity, whatever you're watching. Every single pixel is upscaled beautifully by our powerful picture processing engine, while individual parts of each scene are analysed and matched with a special image database that independently addresses texture, contrast, colour and edges.","price":"56990"}];
    
    /*for(var i = 0; i< product.length; i++){
        Product.insert(product[i], function(err, result){
            console.log("Inserted ",i);
        });
    }
    */
    Product.insertMany(product, function(err, result){
            if(err){
                console.log(err);
            }
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
                service: 'hotmail',
                auth: {
                    user: 'sasankkothe@gmail.com',
                    pass: '9848142120($(#'
                }
            });
            
            var mailOptions = {
                from: 'E-Commerce <sasankkothe@gmail.com>',
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