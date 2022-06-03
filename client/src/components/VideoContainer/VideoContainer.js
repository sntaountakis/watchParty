import React, {useState, useEffect} from "react";
import YouTube from 'react-youtube';
import './VideoContainer.css';


const VideoContainer = ({videoId, videoControls, setVideoControls, sendVideoControls, name}) => {
    
        const [player, setPlayer] = useState({})
        const [transmittedVideoControls, setTransmittedVideoControls] = useState({name: '', videoState: -1, secondsPassed: 0});
        const opts = {
            width: 1280,
            height: 720,
            playerVars: {
                autoplay: 0,
            },
        };        
        

        // A user in the room has changed the video player State
        useEffect(() => {
            
            if(Object.keys(videoControls).length !== 0 && videoControls.name !== name){
                console.log(videoControls.videoState)
                // Match the other user video states
                switch(videoControls.videoState){
                    case 1:
                        player.playVideo();
                        break;
                    case 2:
                        player.pauseVideo();
                        //player.seekTo(videoControls.secondsPassed)
                        break;
                    //case 3:
                    //    player.pauseVideo();
                    //    break;
                    default:
                        break;
                }
            
                // Match the time signature
                if (Math.abs(player.getCurrentTime() - videoControls.secondsPassed) > 2){
                    player.seekTo(videoControls.secondsPassed)
                }
            }
        }, [videoControls])
        

        
        // Set the player object
        const onReady = (event) => {
            setPlayer(event.target)
            document.getElementById('messageBox').style.height = String(event.target.getSize().height).concat("px");
        }

        const captureStateChange = (event) => {
            //let updatedVideoControls = {}
            //updatedVideoControls = {name:name, videoState:event.target.getPlayerState(), secondsPassed:event.target.getCurrentTime()}
            setTransmittedVideoControls({...transmittedVideoControls, name:name, videoState:event.target.getPlayerState(), secondsPassed:event.target.getCurrentTime()});
            //setVideoControls({...videoControls, name:name, videoState:event.target.getPlayerState(), secondsPassed:event.target.getCurrentTime()});
            
        }

        useEffect(() => {
            

            sendVideoControls(transmittedVideoControls);
            
        }, [transmittedVideoControls])


        return (
            <div>
                <YouTube 
                    videoId={videoId}
                    containerClassName="embed embed-youtube"
                    opts={opts}
                    onReady={event => onReady(event)}
                    onStateChange={event => captureStateChange(event)}
                    
                />
            </div>
        )


}

export default VideoContainer;
