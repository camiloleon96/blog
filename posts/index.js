const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const posts = {};//we'll store all the posts here!

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('Hex');//4 hexa Bytes
    const {title} = req.body;

    posts[id] = {
        id, title
    };

    res.status(201).send(post[id]);


});

app.listen(4000, () => {
    console.log('listening on 4000');
});