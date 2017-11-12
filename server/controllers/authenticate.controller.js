var config = require('config.json');
var express = require('express');
var router = express.Router();
var authService = require('services/authenticate.service');
var VerifyToken = require('auth/verifyToken');

// routes
//router.post('/create', create);
router.post('/login', login);
//router.get('/me/:_id', VerifyToken, getById);

module.exports = router;

/*function create(req, res) {
    authService.createUser(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}*/

function login(req, res) {
    authService.login(req.body.name, req.body.password)
        .then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/*function getById(req, res) {
    authService.getById(req.params._id)
        .then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}*/
