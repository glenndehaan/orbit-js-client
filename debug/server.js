/**
 * Vendor imports
 */
const orbit = require('../src')({
    server: 'http://127.0.0.1:3000',
    token: '8e5807fd-410a-4b11-ad27-50c8c0e7d64d',
    project: 'orbit-debug-project',
    env: 'dev'
});
const http = require('http');
const port = 3001;

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
