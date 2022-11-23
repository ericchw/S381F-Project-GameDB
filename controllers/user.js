const formidable = require("formidable")
const userModel = require("../models/user")

exports.handleLogin = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        for(let user of userModel.users){
            if (user.username == fields.username && user.password == fields.password){
                req.session.username = user.username;
                req.session.authenticated = true;
                res.redirect('/main');
                return;
            }
        }
        res.render('err',{"errmsg":"login fail"})
    });

}

exports.handleAPILogin = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        for(let user of userModel.users){
            if (user.username == fields.username && user.password == fields.password){
                req.session.username = user.username;
                req.session.authenticated = true;
                res.send(200);
                return;
            }
        }
        res.send(400);
    });

}