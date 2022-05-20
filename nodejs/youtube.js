const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ffmpeg('http://localhost:8000/vod/output.m3u8')
    .addOption('-vcodec', 'libx264')
    .addOption('-acodec', 'aac')
    .addOption('-crf', 15)
    .addOption('-aspect', '240:128')
    .addOption('-pix_fmt', 'yuv420p')
    .addOption('-f', 'flv')
    .output('rtmp://a.rtmp.youtube.com/live2/' + '').on('end', () => {
        console.log('end');
    }).run();
