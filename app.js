const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/ussd', (req, res) => {
    const { sessionId, phoneNumber, text } = req.body;
    const inputs = text.split('*');
    let response = '';

    if (text === '') {
        response = `CON Welcome to SmartCourier
1. Request Pickup
2. Track Package
3. My Deliveries
4. Help`;
    } else if (text === '1') {
        response = `CON Enter pickup location:`;
    } else if (inputs.length === 2 && inputs[0] === '1') {
        response = `CON Enter delivery destination:`;
    } else if (inputs.length === 3 && inputs[0] === '1') {
        response = `CON Enter package description:`;
    } else if (inputs.length === 4 && inputs[0] === '1') {
        response = `CON Confirm pickup from ${inputs[1]} to ${inputs[2]}?
1. Confirm
2. Cancel`;
    } else if (inputs.length === 5 && inputs[0] === '1' && inputs[4] === '1') {
        response = `END Pickup requested successfully! Tracking ID: TRK${Math.floor(Math.random() * 90000 + 10000)}`;
    } else if (text === '2') {
        response = `CON Enter tracking number:`;
    } else if (inputs.length === 2 && inputs[0] === '2') {
        // Simulate tracking
        response = `END Package ${inputs[1]} is in transit`;
    } else if (text === '3') {
        response = `END You have 2 active deliveries. Check SMS for details.`;
    } else if (text === '4') {
        response = `END For support, call 1234 or visit smartcourier.com`;
    } else {
        response = `END Invalid option`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

app.listen(3000, () => {
    console.log('SmartCourier USSD server running on http://localhost:3000/ussd');
});