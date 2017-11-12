var config = require('config.json');
var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var express = require('express');
var bodyParser = require('body-parser');

var service = {};
service.login = login;
//service.createUser = create;
//service.getById = getById;
module.exports = service;


/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

function login(name, password) {
    var deferred = Q.defer();
    
    db.users.findOne({ name: name }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        console.log(user);
        if (user && bcrypt.compareSync(password, user.password)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                name: user.name,
                token: jwt.sign({ sub: user._id }, config.secret, 
                    {
                        algorithm: 'HS256',
                        expiresIn: 3600 // expires in 1 minute
                    })
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;

};

/*function create(user) {
    console.log(user);
    var deferred = Q.defer();
    
    var hashedPassword = bcrypt.hashSync(user.password, 8);

    db.users.insert({
        name: user.name,
        password: hashedPassword
    },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            
            deferred.resolve();
        });
    return deferred.promise;

};*/

/*function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
};*/
/*router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });
});*/
