const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};//we'll store all the posts here!

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    try {
        const id = randomBytes(4).toString('Hex');//4 hexa Bytes
        const {title} = req.body;

        posts[id] = {
            id, title
        };

        await axios.post('http://localhost:4005/events', {
            type: "PostCreated",
            data: {
                id, title
            }
        });

        res.status(201).send(posts[id]);    
    } catch (error) {
        console.warn(error.message);        
    }
    
});

//event receiver (from the event bus)
app.post('/events', (req, res) => {
    console.group('Event received: ', req.body.type);

    res.send({});
});

app.listen(4000, () => {
    console.log('listening on 4000');
});