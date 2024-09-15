const mongoose = require('mongoose');

var session = new mongoose.Schema({
    id: String,
    ip: String,
    time: String
});
const sessiondb = mongoose.model('session', session);

var order = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    session: String,
    cart: [
      {
        id: String,
        name: String,
        quantity: String,
        price: String
      }  
    ],
    totalCost: String,
    
})

const orderdb = mongoose.model('order', order);

var feedback = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    message: String,
    phone: String,
    session: String
})
const feedbackdb = mongoose.model('feedback', feedback);

module.exports = {
    sessiondb,
    orderdb,
    feedbackdb
};



// Define the schema for the menu
var menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: String, // You can also use Number if price should be a numeric value
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

// Create the model for the menu collection
const menudb = mongoose.model('menu', menuSchema);

module.exports = {
    sessiondb,
    orderdb,
    feedbackdb,
    menudb
};