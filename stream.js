#!/usr/bin/env node
const Promise = require('bluebird');

const fixtures = require('./fixtures');
const commons = require('./commons');
const {initEventStream, securityEventStream} = fixtures;

const LOG_EVERY_Nth_EVENT = 10;

let metricsEventCount = 0;      // for logging purposes only

Promise.resolve()
    .then(startListeningInitEventStream)
    .then(startListeningSecurityEventStream)
    .catch(function (err) {
        console.trace("WTF?");
        console.trace(err);
    });


function startListeningInitEventStream() {
    console.log("Starting listening init event stream");
    initEventStream(function (metrics) {
        metricsEventCount++;
        if (metricsEventCount % LOG_EVERY_Nth_EVENT === 1) {
            console.log(`Processing metrics #${metricsEventCount}`);
        }

        return commons.sendMetrics(metrics);
    });
    return Promise.resolve();
}

function startListeningSecurityEventStream() {
    console.log("Starting listening security event stream");
    securityEventStream(function (metrics) {
        metricsEventCount++;
        if (metricsEventCount % LOG_EVERY_Nth_EVENT === 1) {
            console.log(`Processing metrics #${metricsEventCount}`);
        }

        return commons.sendMetrics(metrics);
    });
    return Promise.resolve();
}