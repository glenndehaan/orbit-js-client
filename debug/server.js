/**
 * Vendor imports
 */
const orbit = require('../src/orbit-client')({
    server: 'https://orbit.example.com',
    token: '8ad78eb4-0d19-44c6-9823-9550ab4c0afb',
    project: 'orbit-test-project',
    env: 'dev'
});
const http = require('http');
const port = 3000;

const server = http.createServer((request, response) => {
    console.log(request.url);
    response.end('Hello World!');
});

server.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }

    console.log(`Server is listening on ${port}`)
});

setTimeout(() => {
    server.close();
    orbit.stop();
}, 120 * 1000);
