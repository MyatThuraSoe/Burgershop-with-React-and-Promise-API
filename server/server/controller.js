var model = require('./model');
var Order = model.orderdb;
var Feedback = model.feedbackdb;
var Session = model.sessiondb;
var sendmail = require('./sendemail');
const url = require('url');
exports.getSession = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    // console.log('Session id is ',req.session.id);
    
   
    var sessiondata = new Session({
        ip: req.socket.remoteAddress,
        time: toString(Date.now()),
        id: req.session.id
    })

    sessiondata
        .save()
        .then(()=>{
            console.log(' new session saved to db ',req.session);
            res.json(req.session.id);
            res.status(200).end();
        })
        .catch(err => {
            console.log(err, " while getting session data");
        });
   



}

// exports.updateViews = (req, res) => {
//     if (req.body) {
//         let views = req.body.views;

//         let condition = { session: req.session.id };
//         Views.findOneAndUpdate(condition, { views: views }, {
//             new: true,
//             runValidators: true,
//         }).catch(err => {
//             console.log(err);
//         });
//         res.status(200).end();
//     }
//     else {
//         return;
//     }

// }
// exports.insights = (req, res) => {
//     if (req.body.password == process.env.LOGIN_PWD) {
//         res.redirect('/insights');
//     } else {
//         console.log('wrong password', req.body.password);
//         res.redirect(url.format({
//             pathname: "/login",
//             query: {
//                 "msg": "Wrong password"
//             }
//         }));
//     }


// }
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
            session: req.session.id
        })

        feedback
            .save()
            .catch(err => {
                console.log(err, " while saving the first data");
            });

        let backURL = req.header('Referer') || '/';
        res.redirect(backURL);
        res.status(200).end();
    }
    else {
        return;
    }

}
exports.postOrder = (req, res) => {
    if (req.body) {
        console.log(req.body.data);
        var order = new Order({
            name: req.body.data.name,
            email: req.body.data.email,
            address: req.body.data.address,
            phone: req.body.data.phone,
            session: req.body.data.session,
            cart: req.body.data.cart,
            totalCost: req.body.data.totalCost
        });
        order
            .save()
            .catch(err => {
                console.log(err, " while saving the order data to db");
            });
        sendmail.sendEmail(req.body.data.email,  req.body.data.name, req.body.data.phone, req.body.data.address, req.body.data.cart, req.body.data.totalCost);
        // let backURL = req.header('Referer') || '/';
        // res.redirect(backURL);
        res.status(200).end();
    }
    else {
        return;
    }

}
// exports.getViews = (req, res) => {
//     Views.find()
//         .sort({ created_at: 1 })
//         .then(views => {
//             res.send(views)
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.message || "Error Occurred while retriving Views db information" })
//         })
// }
