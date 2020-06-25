const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');

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

// blog routes
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => console.log(err));
});

app.post('/blogs', (req, res) => {
  const { title, snippet, body } = req.body;
  const blog = new Blog({
    title,
    snippet,
    body
  });

  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { title: 'Blog Details', blog: result });
    })
    .catch((err) => console.log(err));
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
});

app.get('/blogs/create', (req, res) => {
  res.render('create-blog', { title: 'Create Blog' });
});

app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});
