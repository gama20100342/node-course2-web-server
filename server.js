const express   = require('express');
const hbs       = require('hbs');
const fs        = require('fs');
var app         = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now    = new Date().toString();
    var log    = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            fs.appendFile('Unable to log the request.');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: "Hey! Well be right back."
    });
});

app.use(express.static(__dirname + '/public/'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('Hey! hows fishing?');
    res.render('home.hbs', {
        pageTitle: 'Welcome to HBS View Engine',
        headerTitle: 'Welcome to HBS'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page"
    });
});

app.get('/services', (req, res) => {

});

app.get('/home', (req, res) => {
    res.send({
        name: 'Juanito Gamad',
        like: [
            'games',
            'web development'
        ]
    });
});

app.get('/bad', (req, res) => {
    res.send('<h1>The Page you are trying to access is no longer exists</h1>');
});

app.listen(3000, () => {
    console.log('Server is up and running in port 3000');
}); 