import React, { useRef } from "react";
import VideoJS from '../../video';

const Vod = () => {

    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        muted: true,
        sources: [{
            src: 'http://localhost:8000/vod/output.m3u8',
            type: 'application/x-mpegURL'
        }]
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            console.log('player is waiting');
        });
        player.on('playing', () => {
            console.log('player is playing');
        });
        player.on('ended', function () {
            console.log('player is ended');
            player.currentTime(0);
        });
        player.on('dispose', () => {
            console.log('player will dispose');
        });
        player.on('loadedmetadata', () => {
            console.log('loadedmetadata');    
        });
        player.on('onseeked', () => {
            console.log('onseeked');
        });

        const controlBar = document.querySelector('.vjs-progress-control .vjs-mouse-display');
    
        const div = document.createElement('div');
        div.className = "vjs-thumbnail";
        controlBar.appendChild(div);
  
        const timeTooltip = player
            .getChild('controlBar')
            .getChild('progressControl')
            .getChild('seekBar')
            .getChild('mouseTimeDisplay')
            .getChild('timeTooltip');

        timeTooltip.update = function (time) {

            var temp = null;
            var timeTemp = time;

            if (/^\d+$/.test(timeTemp)) {
                // re-format to: 0:0:09
                timeTemp = '0:0:' + timeTemp;
            } 
            else if (/^\d+:\d+$/.test(timeTemp)) {
                // re-format to: 0:1:09
                timeTemp = '0:' + timeTemp;
            }
            temp = timeTemp.split(':');

            // calculating to get seconds
            timeTemp = (+temp[0]) * 60 * 60 + (+temp[1]) * 60 + (+temp[2]);

            const vodImg = parseInt(timeTemp / 10);

            // updating thumbnail css
            const thumbnail = document.querySelector('.vjs-thumbnail');
            thumbnail.style.width = '213px';
            thumbnail.style.height = '120px';
            thumbnail.style.position = 'absolute';
            thumbnail.style.backgroundImage = 'url(http://localhost:8000/vod/images/vod-thumbnails-'+vodImg+'.jpg)';
            thumbnail.style.display = 'block';
            thumbnail.style.left = '-100px';
            thumbnail.style.top = '-140px';
            console.log(timeTooltip);
            this.write(time);
        }
    };

    return (
        <>
            Vod

            <div className="vod">
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
        </>
    )
}

export default Vod;