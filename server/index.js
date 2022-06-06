const express = require('express');
const socketio = require('socket.io')
const http = require('http');
const router = require('./router');
const cors = require('cors')

const {addUser, removeUser, getUser, getUsersInRoom, setCurrentRoomVideo, getCurrentRoomVideo} = require('./users.js');
const { isBooleanObject } = require('util/types');

const PORT = process.env.PORT || 5000
const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

app.use(router);
app.use(cors());

// Adming generated messages tag: message
// User generated messages tag: userMessage

io.on('connection', (socket) => {
    
    socket.on('join', ({name, room}, callback) => {
       
        const {error, user} = addUser({id: socket.id, name, room});
        
        if(error) return callback(error);
        
        //If no errors proceed

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `User ${user.name} has entered the room.`});

        socket.join(user.room);
        
        //io.to(user.room).emit('getRoomUrl');
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        //Send current Room Video to user
        let videoId = getCurrentRoomVideo(user.room);
        io.to(user.id).emit('videoInput', videoId); 
        

        callback();
    });
    

    socket.on('sendMessage', (message, callback) => {
        //Callback after the event happened
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        callback();
    })

    socket.on('sendVideoId', (videoId, callback) => {
        
        const user = getUser(socket.id)
        setCurrentRoomVideo(user.room, videoId)
        io.to(user.room).emit('videoInput', videoId);
        //callback();
    })

    socket.on('sendVideoControls', (videoControls, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('videoControls', videoControls);
        
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left`});
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        }
    })
});
httpServer.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
