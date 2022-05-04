
const CronJob = require('cron').CronJob;
const fs = require('fs');
const createLiveFile = require('./createLiveFile.js');
let lengthFilesTs = null;
const liveNoDvr = false;
module.exports = new CronJob('*/30 * * * * *', function () {

    const folderLive = './live';
    const folderTs = './vod';
    const file = folderLive + '/live.m3u8';

    if (!lengthFilesTs) {
        lengthFilesTs = fs.readdirSync(folderTs, (err, files) => {
            if (err) return;
            return files.length;
        });
    }

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        let array = data;
        array = array.split('\n');
        const length = array.length - 1;
        const lastTs = array[length];
        const subStr = lastTs.match("output(.*).ts");

        if(!subStr) return;

        let indexTs = parseInt(subStr[1]);

        const newIndexTs = indexTs + 3;

        // if(newIndexTs >= 10){
        //     indexTs = 0;

        // }else{
            
        // }

        if(liveNoDvr){
            let initLiveData = '#EXTM3U\n' +
            '#EXT-X-VERSION:3\n' +
            '#EXT-X-TARGETDURATION:10\n' +
            '#EXT-X-PLAYLIST-TYPE:EVENT\n' +
            '#EXT-X-MEDIA-SEQUENCE:' + newIndexTs +'\n' +
            '#EXTINF:10\n';
    
            for (let i = indexTs; i <= newIndexTs; i++) {
                if (i === newIndexTs) {
                    initLiveData += `#EXT-X-DISCONTINUITY\n#EXTINF:10 \nhttp://localhost:8000/vod/output${i}.ts`;
                } else {
                    initLiveData += `#EXT-X-DISCONTINUITY\n#EXTINF:10 \nhttp://localhost:8000/vod/output${i}.ts\n`;
                }
            }
    
            fs.writeFile(file, initLiveData, err => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('file written successfully');
            });
    
        }else{
            for (let i = indexTs; i <= newIndexTs; i++) {
                if (i === newIndexTs) {
                    data += `#EXT-X-DISCONTINUITY\n#EXTINF:10 \nhttp://localhost:8000/vod/output${i+10}.ts`;
                } else {
                    data += `#EXT-X-DISCONTINUITY\n#EXTINF:10 \nhttp://localhost:8000/vod/output${i+10}.ts\n`;
                }
            }
    
            fs.writeFile(file, data, err => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('file written successfully');
            });
        }
        
    });

});

