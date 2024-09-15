const express = require("express");
const route = express.Router();

const controller = require("./controller");

// API for MenuItems
route.get("/menu", controller.getMenu)

// API
route.get("/session", controller.getSession);
route.post("/order", controller.postOrder);
route.post("/feedback", controller.postFeedback);

//API for Dashboard
route.get("/orders", controller.getOrders);
route.get("/feedback", controller.getFeedback);
route.get("/sessions", controller.getAllSessions);

module.exports = route;
