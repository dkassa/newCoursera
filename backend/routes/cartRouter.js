
   
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Carts = require('../models/carts');
const Dishes = require('../models/dishes');
var authenticate = require('../authenticate');
const cors = require('./cors');

const cartRouter = express.Router();

cartRouter.use(bodyParser.json());

cartRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    Carts.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then((carts) => {
        res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                if (carts == null || carts == undefined)
		            res.json({dishes: []});
	            else
		            res.json(carts);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    console.log(req.body)
    Carts.findOne({user: req.user._id})
    .then((cart) => {
        if (cart) {
            for (var i=0; i<req.body.length; i++) {
                if (cart.dishes.indexOf(req.body[i]._id) === -1) {
                    cart.dishes.push(req.body[i]._id);
                }
            }
            cart.save()
                        .then((cart) => {
                            Carts.findById(cart._id)
                                .populate('user')
                                .populate('dishes')
                                .then((carts) => {
                                    if (carts == null || carts == undefined)
		                                res.json({dishes: []});
	                                else
		                                res.json(carts);
                                })
                        }, (err) => next(err));
        }
        else {
            Carts.create({"user": req.user._id, "dishes": req.body})
            .then((cart) => {
                Carts.findById(cart._id)
                                        .populate('user')
                                        .populate('dishes')
                                        .then((carts) => {
                                            if (carts == null || carts == undefined)
		                                        res.json({dishes: []});
	                                        else
		                                        res.json(carts);
                                        })
            }, (err) => next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err));  
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Carts');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Carts.findOneAndRemove({"user": req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));   
});

cartRouter.route('/:cartId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Carts.findOne({ user: req.user._id })
            .then((Carts) => {
                if (Carts == null || Carts == undefined) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({ "exists": false, "Carts": Carts });
                }
                else {
                    if (Carts.dishes.indexOf(req.params.cartId) < 0) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "exists": false, "Carts": Carts });
                    }
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "exists": true, "Carts": Carts });
                    }
                }

            }, (err) => next(err))
            .catch((err) => next(err))
    })
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Carts.findOne({user: req.user._id})
    .then((cart) => {
        if (cart) {            
            if (cart.dishes.indexOf(req.params.cartId) === -1) {
                cart.dishes.push(req.params.cartId)
                cart.save()
                .then((cart) => {
                    Carts.findById(cart._id)
                                .populate('user')
                                .populate('dishes')
                                .then((Carts) => {
                                    if (Carts == null || Carts == undefined)
		                                res.json({dishes: []});
	                                else
		                                res.json(Carts);
                                })
                }, (err) => next(err))
            }
        }
        else {
            Carts.create({"user": req.user._id, "dishes": [req.params.cartId]})
            .then((cart) => {
                Carts.findById(cart._id)
                                        .populate('user')
                                        .populate('dishes')
                                        .then((Carts) => {
                                            if (Carts == null || Carts == undefined)
		                                        res.json({dishes: []});
	                                        else
		                                        res.json(Carts);
                                        })
            }, (err) => next(err))
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Carts/'+ req.params.cartId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Carts.findOne({user: req.user._id})
    .then((cart) => {
        if (cart) {            
            index = cart.dishes.indexOf(req.params.cartId);
            if (index >= 0) {
                cart.dishes.splice(index, 1);
                cart.save()
                .then((cart) => {
                    Carts.findById(cart._id)
                                .populate('user')
                                .populate('dishes')
                                .then((Carts) => {
                                    if (Carts == null || Carts == undefined)
		                                res.json({dishes: []});
	                                else
		                                res.json(Carts);
                                })
                }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + req.params.cartId + ' not found');
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error('Carts not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = cartRouter;