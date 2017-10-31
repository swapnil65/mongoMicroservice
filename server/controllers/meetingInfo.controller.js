var config = require('config.json');
var express = require('express');
var router = express.Router();
var meetingService = require('services/meetingInfo.service');

// routes
router.post('/createMeetingInfo', create);
router.get('/getLatest/:applicationName', getLatest);

module.exports = router;

function create(req, res) {
    meetingService.createMeeting(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getLatest(req, res) {
    console.log(req.params)
    meetingService.getLatestMeetingInfo(req.params.applicationName)
        .then(function (meetings) {
            res.send(meetings);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}