const http = require('http');

const server = http.createServer((req, res) => {
  console.log('request made');
  
});

port = process.env.port || 3000;

server.listen(port, 'localhost', () => {
  console.log(`server running on port ${port}`);
});
