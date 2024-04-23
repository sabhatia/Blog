const { name } = require('ejs');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

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
app.use(express.urlencoded({extended:true}))

// Setup routing
// 1. Home Page 
app.get('/', (req, rsp) => {
    rsp.redirect('/blogs');
});

// 2. About Page
app.get('/about', (req, rsp) => {
    rsp.render('about');
});

// 3. Redirect Page
app.get('/about-us'), (req, rsp) => {
    rsp.redirect('/about');
}

// blog Routes
app.use(blogRoutes);

// 4. Everything else
app.use((req, rsp) => {
    rsp.status(404).render('404');
});