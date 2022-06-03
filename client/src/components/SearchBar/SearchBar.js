import React, {useState, useEffect} from "react";
import './SearchBar.css';


const SearchBar = ({videoId, setVideoId, sendVideoId}) => {
    
        const [videoUrl, setVideoUrl] = useState('');
        const sendVideo = (event) => {
            //Crop video Url to Id and set Video Id
            try{
                let croppedVideoUrl = event.target.value.split("v=")[1].split("&")[0]
                setVideoId(croppedVideoUrl);
                sendVideoId(croppedVideoUrl);
            }
            catch(err){
                                
            }
        }


        return (
            
        <div className="searchBar">
            <input
                className="videoInput"
                type="text"
                value={videoUrl}
                placeholder="Enter YouTube URL"
                onChange={(event) => setVideoUrl(event.target.value)}  
                onKeyPress={(event) => event.key === 'Enter' ? sendVideo(event) : null}
            />
        </div>    
        )

}

export default SearchBar;