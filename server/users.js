const users = [];
const currentRoomVideo = {};

const addUser = ({ id, name, room }) => {
    
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();   

    const userExists = users.find((user) => user.room === room && user.name === name);

    if (userExists) {
        return { error: 'Username is taken'};
    }

    const user = { id, name, room };
    users.push(user);

    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {

    return users.find((user) => user.id === id);
    
}

const getUsersInRoom = (room) => {

    return users.filter((user) => user.room === room);
    
}

const getCurrentRoomVideo = (room) => {
    return currentRoomVideo[room];
}

const setCurrentRoomVideo = (room, videoId) => {
    currentRoomVideo[room] = videoId; 
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom, setCurrentRoomVideo, getCurrentRoomVideo};