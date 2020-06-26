const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const PORT = process.env.PORT || 3000;
// mongoDB connection string
const mongoURI = 'mongodb://localhost:27017/netninja';

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));

// middleware and static files
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // for accepting form data
app.use(express.json());
app.use(express.static('public'));

// blog routes with scoping
app.use('/blogs', blogRoutes);

// tell express where to find the views you want displayed
app.set('views', 'views');

// register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});
