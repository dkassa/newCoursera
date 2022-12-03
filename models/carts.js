const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = new Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
});

var Carts = mongoose.model('Cart', cartSchema);

module.exports = Carts;