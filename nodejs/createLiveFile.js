const fs = require('fs');

const initLiveData = '#EXTM3U\n' +
  '#EXT-X-VERSION:3\n' +
  '#EXT-X-TARGETDURATION:10\n' +
  '#EXT-X-PLAYLIST-TYPE:EVENT\n' +
  '#EXT-X-MEDIA-SEQUENCE:0\n' +
  '#EXTINF:10\n' +
  'http://localhost:8000/vod/output0.ts\n' +
  '#EXTINF:10\n' +
  'http://localhost:8000/vod/output1.ts\n' +
  '#EXTINF:10\n' +
  'http://localhost:8000/vod/output2.ts\n' +
  '#EXTINF:10\n' +
  'http://localhost:8000/vod/output3.ts';

module.exports = function() {
    console.log('createLiveFile');
    fs.writeFile('./live/live.m3u8', initLiveData, err => {
        if (err) return;
      
        console.log('Init file written successfully');
    });
}
