import React, { useRef } from "react";
import VideoJS from '../../video';

const Live = () => {

    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        liveui: true,
        fluid: true,
        loop: true,
        muted: true,
        preload: 'auto',
        sources: [{
            src: 'http://localhost:8000/live/output.m3u8',
            type: 'application/x-mpegURL'
        }]
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;
        console.log(player);
        // you can handle player events here
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('ended', function () {
            console.log('player is ended');
            player.src({
                src: 'http://localhost:8000/live/output.m3u8'
            });
            player.load();
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
        player.on('timeupdate', () => {
            console.log('timeupdate');
        });

        player.on('retryplaylist', () => {
            console.log('retryplaylist');
        });

        console.log(player.readyState());

        player.on('error', function () {
            console.log(player.error());
        });
    };

    return (
        <>
            Live
            <div className="live">
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
        </>
    )
}

export default Live;