# Orbit JS Client

The orbit telemetry client for JavaScript

[![npm](https://img.shields.io/npm/v/orbit-js-client.svg)](https://www.npmjs.com/package/orbit-js-client) ![node](https://img.shields.io/node/v/orbit-js-client.svg)

## Setup
Install the util:
```
npm install orbit-js-client
```
Require the util somewhere in your code:
```
const orbit = require('orbit-js-client')({
    server: 'https://orbit.example.com',
    token: 'example-token',
    project: 'orbit-test-project',
    env: 'dev'
});
```

That's it the Orbit client will now connect to the Orbit Server and send over the required data

## Stop
To stop Orbit from sending data use the function provided in the return value from the Orbit client:
```
const orbit = require('orbit-js-client')({
    server: 'https://orbit.example.com',
    token: 'example-token',
    project: 'orbit-test-project',
    env: 'dev'
});

orbit.stop();
```

## License

MIT
