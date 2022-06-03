import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client'


import './Chat.css'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
import VideoContainer from '../VideoContainer/VideoContainer'
import SearchBar from '../SearchBar/SearchBar'

let socket;
const ENDPOINT = 'localhost:5000';

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [usersInRoom, setUsersInRoom] = useState([]);
    const [videoId, setVideoId] = useState('');
    const [videoControls, setVideoControls] = useState({name: '', videoState: -1, secondsPassed: 0});
    let location = useLocation();
    
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        socket = io(ENDPOINT);
        
        setName(name);
        setRoom(room);


        socket.emit('join', { name, room }, (error) => {
            
            if (error){
                window.location.href = "/";
                alert(error);
            }
        });

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [ENDPOINT, location.search]);
    
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });
    }, [])
    
    // Receive information for users in room
    useEffect(() => {
        socket.on('roomData', ({room, users}) => {
            setUsersInRoom(users);
        });
    }, [])

    // Receive information for selected video
    useEffect(() => {
        socket.on('videoInput', (videoId) => {
            setVideoId(videoId);
        })
    }, [])

    // Receive information for selected video
    useEffect(() => {
        socket.on('videoControls', (videoControls) => {
            setVideoControls(videoControls);
        })
    }, [])

    

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const sendVideoId = (video) => {
        if (video) {
            socket.emit('sendVideoId', video);
        }
    }


    const sendVideoControls = (transmittedVideoControls) => {
        

        //if (Object.keys(videoControls).length !== 0) {
        if (transmittedVideoControls.name){
            
            socket.emit('sendVideoControls', transmittedVideoControls);
        }
        
    }

    return (
        <div className='outerContainer'>        
            {/*<TextContainer users={usersInRoom}/>*/}
            <div className='searchBarContainer'>
                <SearchBar videoId={videoId} setVideoId={setVideoId} sendVideoId={sendVideoId}/>
            </div>
            <div className='appContainer'>
                <VideoContainer
                    videoId={videoId}
                    videoControls={videoControls}
                    setVideoControls={setVideoControls}
                    sendVideoControls={sendVideoControls}
                    name={name}
                    />
            
            <div className='container' id="messageBox" >
                <InfoBar room={room} usersInRoom={usersInRoom}/>
                <TextContainer users={usersInRoom}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            </div>
        </div>
        
    )
        
    
}

export default Chat;