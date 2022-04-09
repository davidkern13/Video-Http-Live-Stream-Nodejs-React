import React, { useRef } from "react";
import VideoJS from '../../video';

const Vod = () => { 

    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: 'http://localhost:8000/vod/output.m3u8',
            type: 'application/x-mpegURL'
        }]
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // you can handle player events here
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('ended', function(){
            console.log('player is ended');
            player.currentTime(0);
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
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