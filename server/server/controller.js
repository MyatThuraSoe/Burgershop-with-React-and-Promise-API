var model = require("./model");
var Order = model.orderdb;
var Feedback = model.feedbackdb;
var Session = model.sessiondb;
var Menu = model.menudb;
var sendmail = require("./sendemail");
const url = require("url");
exports.getSession = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  let newDate = new Date();
  let datestring = newDate.toDateString() + newDate.toTimeString();

  var sessiondata = new Session({
    ip: req.socket.remoteAddress,
    time: datestring,
    id: req.session.id,
  });

  sessiondata
    .save()
    .then(() => {
      res.json(req.session.id);
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err, " while getting session data");
    });
};

exports.postFeedback = (req, res) => {
  if (req.body) {
    let name = req.body.contactName;
    let email = req.body.contactEmail;
    let phone = req.body.contactPhone;
    let message = req.body.contactMessage;

    console.log(name, email, message);

    var feedback = new Feedback({
      name: name,
      email: email,
      phone: phone,
      message: message,
      session: req.session.id,
    });

    feedback.save().catch((err) => {
      console.log(err, " while saving the first data");
    });

    let backURL = req.header("Referer") || "/";
    res.redirect(backURL);
    res.status(200).end();
  } else {
    return;
  }
};
exports.postOrder = (req, res) => {
  if (req.body) {
    console.log(req.body.data);
    var order = new Order({
      name: req.body.data.name,
      email: req.body.data.email,
      address: req.body.data.address,
      phone: req.body.data.phone,
      session: req.session.id,
      cart: req.body.data.cart,
      totalCost: req.body.data.totalCost,
    });
    order.save().catch((err) => {
      console.log(err, " while saving the order data to db");
    });
    sendmail.sendEmail(
      req.body.data.email,
      req.body.data.name,
      req.body.data.phone,
      req.body.data.address,
      req.body.data.cart,
      req.body.data.totalCost
    );
    res.status(200).end();
  } else {
    return;
  }
};

// For dashboard
exports.getOrders = (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err, " while retrieving orders");
      res.status(500).send({ message: "Error retrieving orders" });
    });
};
exports.getFeedback = (req, res) => {
  Feedback.find()
    .then((feedback) => {
      res.json(feedback);
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err, " while retrieving feedback");
      res.status(500).send({ message: "Error retrieving feedback" });
    });
};
exports.getAllSessions = (req, res) => {
  Session.find()
    .then((sessions) => {
      res.json(sessions);
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err, " while retrieving sessions");
      res.status(500).send({ message: "Error retrieving sessions" });
    });
};


// Menu
exports.getMenu = (req, res) => {
  Menu.find()
    .then((menuItems) => {
      res.json(menuItems);
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err, " while retrieving menu items");
      res.status(500).send({ message: "Error retrieving menu items" });
    });
};
