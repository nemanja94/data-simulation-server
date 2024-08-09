const express = require('express');

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST requests
app.post('/data', (req, res) => {
    const receivedData = req.body;
    console.log('Received JSON data:', receivedData);

    // Send a response back to the client
    res.status(200).json({ message: 'Data received successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
