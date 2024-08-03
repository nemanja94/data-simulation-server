const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/data', (req, res) => {
    const data = {
        id: 1,
        name: "Sample Item",
        price: 10.99
    };
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});