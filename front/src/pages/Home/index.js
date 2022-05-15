import { useEffect } from 'react';
import Live from '../../containers/Live';
import Vod from '../../containers/Vod';

const Home = () => {

    useEffect(() => {

        const Hls = window.Hls;
        var video = document.getElementById('video');

        var hls = new Hls();

        // bind them together
        hls.attachMedia(video);
        console.log(hls);

        function onLevelLoaded() {
            console.log(hls);
        }

        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            console.log('video and hls.js are now bound together !');
            hls.loadSource('http://localhost:8000/live/output.m3u8');
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log(
                    'manifest loaded, found ' + data.levels.length + ' quality level'
                );
            });
            hls.on(Hls.Events.LEVEL_LOADED, onLevelLoaded);
        });
      
        return () => { };
    }, []);

    return (
        <>
          <video controls id={'video'} width={720} height={420}/>
        </>
    )
}

export default Home;