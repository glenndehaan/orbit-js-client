/**
 * Import vendor modules
 */
const os = require('os');
const fetch = require('node-fetch');

/**
 * Check if Orbit failed before
 *
 * @type {boolean}
 */
let failed = false;

/**
 * Sends telemetry data to the Orbit server
 *
 * @param server
 * @param token
 * @param project
 * @param env
 */
const runner = (server, token, project, env) => {
    /**
     * Check if Orbit failed
     */
    if (failed) {
        return;
    }

    /**
     * Build the telemetry data object
     */
    const telemetry = {
        os: {
            hostname: os.hostname(),
            type: os.type(),
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            uptime: os.uptime(),
            loadavg: os.loadavg(),
            totalmem: os.totalmem(),
            freemem: os.freemem(),
            cpus: os.cpus(),
            networkInterfaces: os.networkInterfaces()
        },
        process: {
            arch: process.arch,
            argv: process.argv,
            cwd: process.cwd(),
            env: process.env,
            groups: process.getgroups(),
            uid: process.getuid(),
            pid: process.pid,
            uptime: process.uptime()
        },
        project,
        env,
        updated: new Date().getTime()
    };

    fetch(`${server}/api/app`, {
        method: 'post',
        body: JSON.stringify(telemetry),
        headers: {
            'Content-Type': 'application/json',
            'bearer': token
        }
    }).catch(() => {
        console.log('[Orbit] Failed. Dropping this only once.');
        failed = true;
    });
};

/**
 * Exports the Orbit Client
 *
 * @param server
 * @param token
 * @param project
 * @param env
 * @return {{server: *, stop: (function(): void), token: *}|undefined}
 */
module.exports = ({server = false, token = false, project = '', env = ''}) => {
    /**
     * Check if the Orbit Server is provided
     */
    if (!server) {
        console.log('[Orbit] No server provided!');
        return undefined;
    }

    /**
     * Check if the Orbit Server Token is provided
     */
    if (!token) {
        console.log('[Orbit] No token provided!');
        return undefined;
    }

    /**
     * Send data and start runner
     */
    runner(server, token, project, env);
    const activeRunner = setInterval(() => runner(server, token, project, env), 600 * 1000); // Run after every 10 minutes

    /**
     * Return stop function
     */
    return {server, token, stop: () => clearInterval(activeRunner)};
};
