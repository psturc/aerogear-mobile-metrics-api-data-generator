#!/usr/bin/env node
const Promise = require('bluebird');

const fixtures = require('./fixtures');
const commons = require('./commons');
const {metricsStream} = fixtures;

const LOG_EVERY_Nth_EVENT = 10;

let metricsEventCount = 0;      // for logging purposes only

Promise.resolve()
    .then(startListeningEventStream)
    .catch(function (err) {
        console.trace("WTF?");
        console.trace(err);
    });


function startListeningEventStream() {
    console.log("Starting listening metrics stream");
    metricsStream(function (metrics) {
        metricsEventCount++;
        if (metricsEventCount % LOG_EVERY_Nth_EVENT === 1) {
            console.log(`Processing metrics #${metricsEventCount}`);
        }

        return commons.sendMetrics(metrics);
    });
    return Promise.resolve();
}