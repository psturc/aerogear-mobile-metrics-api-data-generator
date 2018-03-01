#!/usr/bin/env node
const request = require("request-promise");

module.exports = {
    sendMetrics: function (metrics) {
        const url = "http://localhost:3000/metrics";
        const options = {
            method: "POST",
            uri: url,
            body: metrics,
            json: true
        };

        return request(options)
            .catch(function(err){
                console.log("Error", err)
            });
    }
};