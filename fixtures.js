const random = Math.random;

// has duplicate values for simulating a bias
const PLATFORMS = ["android", "android", "ios"];
const APP_IDS = ["com.example.someApp", "com.example.someApp", "com.example.someOtherApp", "com.example.anotherApp"];
const SDK_VERSIONS = ["0.0.1", "1.0.0", "1.0.0", "2.0.0", "2.0.0", "2.0.0", "3.0.0", "3.0.0", "3.0.0", "3.0.0"];
const CLIENT_IDS = {android: ["a1", "a1", "a2", "a3", "a3", "a4"], ios: ["i1", "i1", "i2", "i3", "i3", "i4"]};
const APP_VERSIONS = {android: ["256", "256", "257", "290", "290", "290"], ios: ["1.2.3", "4.5.6", "7.8.9"]};
const PLATFORM_VERSIONS = {android: ["23", "27", "27", "28", "28", "28"], ios: ["10.1", "10.2", "11.3"]};

const EVENT_STREAM_FREQUENCY = 50;   // e.g. every 5 seconds means 60*60*24/5 = 17K app inits per day


module.exports = {
    metricsStream: metricsStream,
};

function metricsStream(listener) {
    setInterval(function () {
        if (listener) {
            const platform = PLATFORMS[Math.floor(random() * PLATFORMS.length)];
            listener({
                    clientId: CLIENT_IDS[platform][Math.floor(random() * CLIENT_IDS[platform].length)],
                    data: {
                        app: {
                            id: APP_IDS[Math.floor(random() * APP_IDS.length)],
                            sdkVersion: SDK_VERSIONS[Math.floor(random() * SDK_VERSIONS.length)],
                            appVersion: APP_VERSIONS[platform][Math.floor(random() * APP_VERSIONS[platform].length)]
                        },
                        device: {
                            platform: platform,
                            platformVersion: PLATFORM_VERSIONS[platform][Math.floor(random() * PLATFORM_VERSIONS[platform].length)]
                        }
                    }
                }
            );
        }
    }, EVENT_STREAM_FREQUENCY * (Math.random() * 0.5 + 1));
}