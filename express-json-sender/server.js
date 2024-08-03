const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Start sending data every 5 seconds
const targetUrl = 'http://localhost:3000/data'; // TODO

let dataJson = {
    "greenhouse_id": "1",
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
}

function sendJsonData() {
    const jsonData = {
        timestamp: new Date().toISOString(),
        data: dataJson
    };

    app.get('/data', (req, res) => {
        res.json(jsonData);
    });

    // axios.post(targetUrl, jsonData)
    //     .then(response => {
    //         console.log(`Data sent successfully: ${response.status}`);
    //     })
    //     .catch(error => {
    //         console.error(`Error sending data: ${error.message}`);
    //     });
}

// Send JSON data every 5 seconds
setInterval(sendJsonData, 5000);

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
