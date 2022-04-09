const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');

const createLiveFile = require('./createLiveFile.js');
const cron = require('./cron.js');

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(cors());

createLiveFile();
cron.start();

app.get('/vod/:id', (req, res) => {
  const filePath = '.' + req.url;

  if (filePath.includes('.ts')) {
    const stream = fs.createReadStream(filePath, { bufferSize: 64 * 1024 });
    stream.pipe(res);
  } else {
    fs.readFile(filePath, function (error, content) {
      res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
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
  const filePath = '.' + req.url;
  fs.readFile(filePath, function (error, content) {
    res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});