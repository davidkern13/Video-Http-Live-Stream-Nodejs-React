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

    function capture(time) {
        var newTime = time.split(':');
        const seconds = parseInt(newTime[0]) * 60 + parseInt(newTime[1]);
        var canvas = document.getElementById('canvas');
        var video = document.querySelector('video');
        console.log('loadedmetadata');
        video.currentTime = seconds;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = canvas.toDataURL();
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // you can handle player events here
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


        const timeTooltip = player
            .getChild('controlBar')
            .getChild('progressControl')
            .getChild('seekBar')
            .getChild('mouseTimeDisplay')
            .getChild('timeTooltip');


        timeTooltip.update = function (seekBarRect, seekBarPoint, time) {
            console.log('seekBarRect', seekBarRect);
            console.log('seekBarPoint', seekBarPoint);
            console.log('time', time);
            capture(time);
            this.write(time);
        }

    };

    return (
        <>
            Vod

            <div className="vod">
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
            <canvas id="canvas"></canvas>
        </>
    )
}

export default Vod;