/*
 * Variables for Dependencies
 */
const express = require('express');
const app = express();
const { projects } = require('./data.json');


/*
 * Middleware
 */ 
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

/*
 * Routes
 */

// Home Page
app.get('/', (req, res) => {
    res.render('index', { projects });
});

// About Page
app.get('/about', (req, res) => {
    res.render('about');
});

// Project Pages
app.get('/project/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    
    res.render('project', { project });
  });

/*
 * Error Handling
 */
app.use((req, res, next) => {
    const err = new Error('Sorry, page not found.');
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.error(`${err.status}: ${err.message}`);
    res.render("error", {err});
  });

/*
 * Start Server
 */
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});
