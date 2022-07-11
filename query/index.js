const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts)
});

app.post('/events', (req, res) => {
    console.group('Received Event: ', req.body.type);
    const {type, data } = req.body;

    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    }

    if (type === 'CommentCreated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({id, content});
    }

    if (type === 'CommentUpdated') {
        const { id, status, postId, content } = data;
        const post = posts[postId];
        console.warn(JSON.stringify(post,null,4))
        const comment = post.comments.find(comment =>{
            return comment.id === id;
        });
        //comment.status = status; //the update can be in any field! so lets better...
        comment.content = content;
    }

    console.log(posts);
    res.send({});
});

app.listen(4002, ()=>{
    console.log('Listening on port 4002');
});