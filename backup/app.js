const express = require('express');

//express app
const app = express();

// listen for requests
app.listen(3000);

// setup routing
// 1. Home Page
app.get('/', (req, rsp) => {
    rsp.sendFile('./home/index.html', {root: __dirname});
});

// 2. About Page
app.get('/about', (req, rsp) => {
    rsp.sendFile('./home/about.html', {root: __dirname});
});

// 3. Redirect Page
app.get('/about-us'), (req, rsp) => {
    rsp.redirect('/about');
}

// 4. Everything else
app.use((req, rsp) => {
    rsp.status(404).sendFile('./home/404.html', {root: __dirname});
});