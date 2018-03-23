const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs', {});
// });
app.get('/', (req,res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Abhinav',
    //     add: [
    //         '1050',
    //         'sector 9'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req,res) => {
    res.send({
        error: 'ERROR'
    });
});

app.listen(3000);