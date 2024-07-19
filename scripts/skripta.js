import http from 'k6/http';
import http from '../scripts/skripta.js';

import { check, sleep } from 'k6';

// Options
export let options = {
    stages: [
        { duration: '10s', target: 10 },  // Ramp up to 2 VUs over 10 seconds
        { duration: '20s', target: 5 },  // Ramp up to 5 VUs over 20 seconds
        { duration: '30s', target: 10 }, // Ramp up to 10 VUs over 30 seconds
        { duration: '10s', target: 10 }, // Stay at 10 VUs for 10 seconds
        { duration: '10s', target: 0 },  // Ramp down to 0 VUs over 10 seconds
    ],
    //duration: '80s', // Total duration of the test (10s + 20s + 30s + 10s + 10s)
    executor: "shared-iterations",
    thresholds: {
        'http_req_duration{status:200}': ['p(95)<500'], // 95% of successful requests should complete within 500ms
    },
};

export default function () {
    // Define the target URL
    const url = 'https://google.com/';

    // Send an HTTP GET request and measure the response time
    const response = http.get(url);

    // Check if the response status code is 200 (OK)
    check(response, {
        'is status 200': (r) => r.status === 200,
    });

    // Print the response time to the console
    console.log(`Response time for ${url}: ${response.timings.duration} ms`);

    // Sleep for a short duration between requests (e.g., 1 second)
    sleep(1);
}
