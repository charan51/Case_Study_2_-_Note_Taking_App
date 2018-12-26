const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NotePostModel = require('./schema/notePost');
// mongodb connect config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/noteTaking').then(() => {
    console.log("connected to DB success");
}).catch(err => console.log(err));

// Note taking Post API
app.post('/notes', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const newPost = new NotePostModel({ title: title, content: content, createAt: Date.now() });
    newPost.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send(newPost);
});
// API to get all the data
app.get('/notes', (req, res) => {
    NotePostModel.find((err, data) => {
        if (err) {
            return res.send(400).send('there is some trouble in access data');
        }
        return res.status(200).send(data);
    });
});
// Retrive the data using ID
app.get('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    NotePostModel.findById(noteId)
    .exec((err, data) => {
        if (err) {
            return res.send(400).send('there is some trouble in access data');
        }
        res.status(200).send(data);
    });
});
// Update the note app with ID
app.put('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    const title = req.body.title;
    const content = req.body.content;
    const updatedAt = Date.now();
    NotePostModel.findByIdAndUpdate(noteId, {title: title, content: content, updatedAt: updatedAt})
    .exec((err, data) => {
        if (err) {
            return res.send(400).send('there is some trouble in access data');
        }
        res.status(200).send(data);
    });
});
//  Delete the note by id
app.delete('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    NotePostModel.findByIdAndDelete(noteId)
    .exec((err, data) => {
        if (err) {
            return res.send(400).send('there is some trouble in access data');
        }
        res.status(200).send(data);
    });
});

// Server running on below port
app.listen(8080, () => {
    console.log('server running');
})

