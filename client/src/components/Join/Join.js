import React, {useState} from 'react';
import {useStateWithCallbackLazy} from 'use-state-with-callback';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

import './Join.css';
import logo from '../../icons/watchParty-logo.png';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState(uuidv4());

    const titleWatch = {
        color: "black",
        // textShadow: "0px 3px 5px #585858",
        fontSize: "100px",
        fontWeight: "400",
        fontFamily: "Raleway",
        
        paddingLeft: "0px"
    };
    
    const titleParty = {
        color: "#995cd6",//"#e51d1d",
        //textShadow: "0px 0px 10px #9f0000",
        //"#f49511"
        textShadow:"0px 3px 9px 0px #585858",
        fontSize: "150px",
        fontFamily: "Pacifico",
        fontWeight: "100",
        borderRadius: "5px",
        paddingLeft: "0px",
        paddingRight: "0px"
    };

    const startRoom = (event) => {
        if (!name) {
            event.preventDefault();

        }
        else{
            
            return null;
        }
    }
    //{event => (!name || !room) ? event.preventDefault() : null}
    return (
        <div className="joinOuterContainer">
            <div className="titleContainer">
                <img className="watchPartyLogo" src={logo} alt="logo"/>
            </div>
            <div className="joinInnerContainer">
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Start Party</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;