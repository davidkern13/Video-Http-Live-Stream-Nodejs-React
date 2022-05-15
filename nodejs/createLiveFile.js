const fs = require('fs');

const path = './live/live.m3u8';



module.exports = function () {

  const initLiveData = '#EXTM3U\n' +
  '#EXT-X-VERSION:3\n' +
  '#EXT-X-TARGETDURATION:10\n' +
  '#EXT-X-PLAYLIST-TYPE:EVENT\n' +
  // '#EXT-X-START:0\n' +
  '#EXT-X-MEDIA-SEQUENCE:1\n' +
  '#EXTINF:10\n' +
  'http://localhost:8000/vod/output0.ts\n' +
  '#EXTINF:10\n' +
  'http://localhost:8000/vod/output1.ts\n' +
  '#EXTINF:10\n' +
  'http://localhost:8000/vod/output2.ts\n' +
  '#EXTINF:10\n' +
  'http://localhost:8000/vod/output3.ts';


  try {
    fs.unlinkSync(path);
    console.log('deleteLiveFile');
  } catch (err) {
    console.error(err)
  }
  console.log('createLiveFile');
  fs.writeFile(path, initLiveData, err => {
    if (err) return;

    console.log('Init file written successfully');
  });
}
