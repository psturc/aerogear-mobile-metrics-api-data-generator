#!/usr/bin/env node
const request = require("request-promise");

module.exports = {
    sendMetrics: function (metrics) {
        // const url = "http://a-asd.192.168.37.1.nip.io/metrics";
        // const url = "http://localhost:3000/metrics";
        const url = "http://a-asd.192.168.37.1.nip.io/metrics";
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