const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');
const numeral = require('numeral');
const createLiveFile = require('./createLiveFile.js');
const cron = require('./livecron.js');

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(cors());

createLiveFile();
cron.start();

//static images vod
app.use('/vod/images',express.static(__dirname + '/static/vod'));

app.get('/vod/:id', (req, res) => {
  res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
  const filePath = '.' + req.url;

  if (filePath.includes('.ts')) {
    const stream = fs.createReadStream(filePath, { bufferSize: 64 * 1024 });
    stream.pipe(res);
  } else {
    fs.readFile(filePath, function (error, content) {
      
      if (error) {
        if (error.code === 'ENOENT') {
          res.end(content, 'utf-8');
        }
        else {
          res.writeHead(500);
          res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
          res.end();
        }
      }
      res.end(content, 'utf-8');
    });
  }
});

app.get('/vod-short/:id', (req, res) => {
  res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
  const filePath = '.' + req.url;

  if (filePath.includes('.ts')) {
    const stream = fs.createReadStream(filePath, { bufferSize: 64 * 1024 });
    stream.pipe(res);
  } else {
    fs.readFile(filePath, function (error, content) {
      
      if (error) {
        if (error.code === 'ENOENT') {
          res.end(content, 'utf-8');
        }
        else {
          res.writeHead(500);
          res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
          res.end();
        }
      }
      res.end(content, 'utf-8');
    });
  }
});

app.get('/live/:id', (req, res) => {
  res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
  const filePath = '.' + req.url;
  fs.readFile(filePath, function (error, content) {
   
    if (error) {
      if (error.code === 'ENOENT') {
        res.end(content, 'utf-8');
      }
      else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        res.end();
      }
    }
    res.end(content, 'utf-8');
  });
});


app.get('/live/output.m3u8', (req, res) => {
  res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
  
  fs.readFile('./live/output.m3u8', function (error, content) {
   
    if (error) {
      if (error.code === 'ENOENT') {
        res.end(content, 'utf-8');
      }
      else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        res.end();
      }
    }
    res.end(content, 'utf-8');
  });
});

// setInterval(() => {
//   // 1. Force garbage collection every time this function is called
//   // try {
//    console.log(global);
//   // } catch (e) {
//   //   console.log("You must run program with 'node --expose-gc index.js' or 'npm start'");
//   //   process.exit();
//   // }
//   const { rss, heapUsed, heapTotal } = process.memoryUsage();
//   console.log(
//     'rss',
//     numeral(rss).format('0.0 ib'),
//     'heapUsed',
//     numeral(heapUsed).format('0.0 ib'),
//     'heapTotal',
//     numeral(heapTotal).format('0.0 ib'),
//   );
// }, 5000);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});