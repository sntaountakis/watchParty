import React from "react";

import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'
import people from '../../icons/people.png'

import Dropdown from './Dropdown'

import './InfoBar.css';

const InfoBar = ({room, usersInRoom}) => {
    
    const showUsers = () => {
        
        var x = document.getElementById("textContainer")
        if (x.style.display == "none"){
            x.style.display = "flex";
        
        }else {
            x.style.display = "none";
        }
    }
    
    return (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online image"/>
            <h3>{room}</h3>
        </div>
        
        <div className="middleContainer">
            {/*<Dropdown usersInRoom={usersInRoom}/>*/}
        </div>
        <div className="rightInnerContainer">
            <img className="peopleIcon" src={people} alt="people image" role="button" onClick={() => showUsers()}></img>
            <a href="/"><img className="closeIcon" src={closeIcon} alt="close image"></img></a>
        </div>
    </div>
)}


export default InfoBar;