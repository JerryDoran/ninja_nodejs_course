const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log('hello');
  });

  greet();
  greet();

  // set header content type
  // res.setHeader('Content-Type', 'text/plain');
  // res.write('hello client');
  // res.end();

  // res.setHeader('Content-Type', 'text/html');
  // res.write('<h1>hello client</h1>');
  // res.write('<p>this is a response from the server</p>');
  // res.end();

  res.setHeader('Content-Type', 'text/html');

  let path = './views/';
  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  // send html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      res.end(data);
    }
  });
});

port = process.env.port || 3000;

server.listen(port, 'localhost', () => {
  console.log(`server running on port ${port}`);
});
