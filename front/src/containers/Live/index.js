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
        muted:true,
        sources: [{
            src: 'http://localhost:8000/live/live.m3u8',
            type: 'application/x-mpegURL'
        }]
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // you can handle player events here
        player.on('waiting', () => {
            console.log('player is waiting');
            // player.load();
        });

        player.on('ended', function(){
            console.log('player is ended');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
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