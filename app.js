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
  const project = projects[projectId];
  if (project) {  
    res.render('project', { project });
  } else {
    next();
  }
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
  err.message = err.message || 'Oops! It looks like something went wrong on the server.';
  if (err.status === 404) {
    res.status(404).render('error', {err});
  } else {
    res.status(err.status || 500).render('error', {err});
  }
});

/*
 * Start Server
 */
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});
