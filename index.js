const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');

const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

dotenv.config();
const port = process.env.PORT;


const app = express();
app.use(cors());


app.get('/output/:id', (req, res) => {
  const filePath = '.' + req.url;

  fs.readFile(filePath, function (error, content) {
    res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
    if (error) {
      if (error.code == 'ENOENT') {
        res.end(content, 'utf-8');
      }
      else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        res.end();
      }
    }
    else {
      if (filePath.includes('.ts')) {
        const stream = fs.createReadStream(filePath,{ bufferSize: 64 * 1024 });
        stream.pipe(res);
      } else {
        res.end(content, 'utf-8');
      }
    }
  });

});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});