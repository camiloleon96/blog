const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req,res) => {
    console.log('_________________________')
    const event = req.body;
    console.warn(event);
    try {
        await axios.post('http://localhost:4000/events', event);
        await axios.post('http://localhost:4001/events', event);
        await axios.post('http://localhost:4002/events', event);
        await axios.post('http://localhost:4003/events', event);

        console.warn('----ALL ok----');
        res.send({status: 'ok'});    
    } catch (error) {
        console.log('---ERROR---')
        console.warn(error.message)
    }
    
});

app.listen(4005, () => {
    console.warn('Listening on port 4005');
});