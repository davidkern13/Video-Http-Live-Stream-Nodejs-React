const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffprobeInstaller = require('@ffprobe-installer/ffprobe');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

ffmpeg('./videos/DeepHouse.avi')
  .on('end', function () {
    console.log('Screenshots taken');
  })
  .output('static/vod/vod-thumbnails-%01d.jpg')
  .outputOptions(
    '-q:v',
    '8',
    '-vf',
    'fps=1/10,scale=-1:120',//,tile=5x5
  )
  .run();


