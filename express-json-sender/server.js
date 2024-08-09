const express = require('express');
const axios = require('axios');
const async = require('async');

const app = express();
const port = 3000;
let count = 0;
// Middleware to parse JSON bodies
app.use(express.json());

// Example URL of the external API
const apiURL = 'http://localhost:3001/data';

// Create a queue to handle concurrent requests, limit to 2 concurrent requests
const queue = async.queue(async (task, callback) => {
    try {
        await sendPostRequestWithRetry(task.data);
        callback(); // Ensure callback is called after successful processing
    } catch (error) {
        console.error('Error processing request:', error.message);
        callback(error); // Pass the error to the callback to ensure it's handled
    }
}, 2); // Limit to 2 concurrent requests

// Retry function with exponential backoff
const sendPostRequestWithRetry = async (data, retries = 3, backoff = 2000) => {
    try {
        const response = await axios.post(apiURL, data, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000 // Increase timeout if needed
        });
        console.log("sending: " + count)
        console.log('Data sent to external API:', response.data);
    } catch (error) {
        console.error('Error sending data to external API:', error.message);
        if (retries > 0) {
            console.log(`Retrying in ${backoff / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, backoff));
            await sendPostRequestWithRetry(data, retries - 1, backoff * 2); // Exponential backoff
        } else {
            console.log('All retry attempts failed.');
        }
    }
};

// Function to push tasks into the queue every 5 seconds
const sendPostRequest = () => {
    // Example data to be sent
let dataJson = {
    "greenhouse_id": count,
    "greenhouse_name": "Greenhouse 1",
    "date": "2021-06-01T00:00:00.000Z",
    "bar_quantity": 3,
    "bars_data": {
        "1": {
            "bar_id": "1",
            "bar_name": "Bar 1",
            "data": {
                "humidity": {
                    "zone_n10": 0.5,
                    "zone_30": 0.8,
                    "zone_120": 0.9
                },
                "temperature": {
                    "zone_n10": 0.5,
                    "zone_30": 0.8,
                    "zone_120": 0.9
                },
                "ph": 1,
                "air_pressure": 1000
            }
        },
        "2": {
            "bar_id": "1",
            "bar_name": "Bar 1",
            "data": {
                "humidity": {
                    "zone_n10": 0.5,
                    "zone_30": 0.8,
                    "zone_120": 0.9
                },
                "temperature": {
                    "zone_n10": 0.5,
                    "zone_30": 0.8,
                    "zone_120": 0.9
                },
                "ph": 1,
                "air_pressure": 1000
            }
        },
        "3": {
            "bar_id": "1",
            "bar_name": "Bar 1",
            "data": {
                "humidity": {
                    "zone_n10": 0.5,
                    "zone_30": 0.8,
                    "zone_120": 0.9
                },
                "temperature": {
                    "zone_n10": 0.5,
                    "zone_30": 0.8,
                    "zone_120": 0.9
                },
                "ph": 1,
                "air_pressure": 1000
            }
        }
    }
};
            count++;
    queue.push({ data: dataJson }, (err) => {
        if (err) {
            console.error('Error in queue processing:', err.message);
        }
    });
};

// Start sending POST requests every 5 seconds
setInterval(sendPostRequest, 5000);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
