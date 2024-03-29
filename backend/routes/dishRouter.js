const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const Dishes = require('../models/dishes');
const authenticate = require('../authenticate');


//create route handler
const dishRouter = express.Router();

//Use middleware to read JSON
dishRouter.use(bodyParser.json());

//mount http routes for dishes
dishRouter
  .route('/')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get(cors.cors,(req, res, next) => {
    Dishes.find(req.query).
      populate('comments.author')
      .then(
        dishes => {
           res.json(dishes);
         
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(
   // cors.corsWithOptions,
   // authenticate.verifyUser,
    //authenticate.verifyAdmin,
    (req, res, next) => {
      Dishes.create(req.body)
        .then(
          dish => {
            console.log('Dish Created: ', dish);
            res.json(dish);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.statusCode = 403;
      res.end('PUT operation not supported on /dishes');
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Dishes.deleteOne({})
        .then(
          resp => {
            res.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

//mount http routes for dishId
dishRouter
  .route('/:dishId')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get(cors.cors, (req, res, next) => {
    Dishes.findById(req.params.dishId)
      .populate('comments.author')
      .then(
        dish => {
          res.json(dish);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'text/plain');
      res.end(
        `POST operation not supported on /dishes/ ${req.params.dishId} /`
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Dishes.findByIdAndUpdate(
        req.params.dishId,
        {
          $set: req.body
        },
        { new: true }
      )
        .then(
          dish => {
            res.json(dish);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Dishes.findByIdAndRemove(req.params.dishId)
        .then(
          resp => {
            res.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

module.exports = dishRouter;