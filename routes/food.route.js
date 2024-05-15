const express = require('express');
const app = express();
const foodRoutes = express.Router();

let Food = require('../model/Food');

// api to add food
foodRoutes.route ('/add').post(function (req, res){
  let food = new Food(req.body);
  food.save()
  .then(food => {
    res.status(200).json({'status': 'success','mssg': 'food added successfully'});
  })
  .catch(err => {
    console.error(err);
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get foods
foodRoutes.route('/').get(function (req, res) {
  Food.find(function (err, foods){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','foods': foods});
    }
  });
});

// api to get food
foodRoutes.route('/food/:id').get(function (req, res) {
  let id = req.params.id;
  Food.findById(id, function (err, food){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','food': food});
    }
  });
});

// api to update route
foodRoutes.route('/update/:id').put(function (req, res) {
    Food.findById(req.params.id, function(err, food) {
    if (!food){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        food.restaurant = req.restaurant;
        food.price = req.body.price;
        food.food_name = req.body.food_name;
        food.drink_name = req.body.drink_name;

        food.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
foodRoutes.route('/delete/:id').delete(function (req, res) {
  Food.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = foodRoutes;