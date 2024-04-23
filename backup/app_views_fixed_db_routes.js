const { name } = require('ejs');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('../models/blogs');

//3rd part app(s) 
const app = express();

// mongo db data
const mongodb_uri = 'mongodb://localhost:27017/blogs-db'
mongoose.connect(mongodb_uri)
    .then((result) => {console.log("Connected to DB");})
    .catch((err) => {console.log(err);})

// setup views engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);
app.use(morgan('dev'));

// mongoose routes
app.get('/add-blog', (req, res) => {
    const new_blog = new Blog({
        title: 'My New Blog',
        snippet: 'A new blog about stuff',
        body: 'Lots of data about lots of stuff, good data',
    });

    new_blog.save()
        .then((result) => {res.send(result)})
        .catch((err) => console.log(err));
});

app.get('/all-blogs', (req, rsp) => {
    Blog.find()
    .then((result) => {rsp.send(result)})
    .catch((err) => {console.log(err)})
});

app.get('/single-blog', (req, rsp) => {
    Blog.findById('661f030cea204dbe1cf1e69b')
        .then((result) => {rsp.send(result)})
        .catch((err) => {console.log(err)})
});

// setup routing
// 1. Home Page 
app.get('/', (req, rsp) => {
    // define an array to display as JS in the index page
    const hobbies = [
        {name: 'Ansh', hobby: ' loves to play video games'},
        {name: 'Muskaan', hobby: ' loves gymnastics'},
        {name: 'Preeti', hobby: 'loves reading books'}
    ];
    rsp.render('index', { hobbies });
    //rsp.sendFile('./home/index.html', {root: __dirname});
});

// 2. About Page
app.get('/about', (req, rsp) => {
    rsp.render('about');
});

// 3. Redirect Page
app.get('/about-us'), (req, rsp) => {
    rsp.redirect('/about');
}

// 4. Blogs Page
app.get('/create-blog', (req, rsp) => {
    rsp.render('create_blog')
})

// 4. Everything else
app.use((req, rsp) => {
    rsp.status(404).render('404');
});