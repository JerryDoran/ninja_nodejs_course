const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {
  encoding: 'utf8'
});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// listening to a data event using 'on' event of the readStream object
readStream.on('data', (chunk) => {
  console.log('--------- NEW CHUNK ---------');

  // returns a buffer
  // console.log(chunk);

  // returns the actual text
  // console.log(chunk.toString());

  // console.log(chunk);

  // writeStream.write('\nNEW CHUNK\n');
  // writeStream.write(chunk);

  // piping
  readStream.pipe(writeStream);
});
