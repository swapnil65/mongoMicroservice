var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });

db.bind('meetingInfo');

var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');

var service = {};

service.createMeeting = createMeeting;
service.getLatestMeetingInfo = getLatestMeetingInfo;

module.exports = service;

function createMeeting(meetingInfoParam) {
    var deferred = Q.defer();

    // validation
    db.meetingInfo.findOne(
        { meetingId: meetingInfoParam.meetingId },
        function (err, meeting) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (meeting) {
                deferred.reject('Meeting "' + meetingInfoParam.meetingId + '" is already taken');
            } else {
                createMeetingInfo();
            }
        });

    function createMeetingInfo() {
        meetingInfoParam.startDate = new Date(dt.now());
        db.meetingInfo.insert(
            meetingInfoParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function getLatestMeetingInfo(applicationName) {
    var deferred = Q.defer();

    db.meetingInfo.find({ applicationName: "app" }).sort({ "startDate": -1 }).limit(1).toArray(function (err, meeting) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        else {
            deferred.resolve(meeting);
        }
    });

    return deferred.promise;
}