import React from "react";

import './TextContainer.css'

const TextContainer = ({users}) => (
    <div className="textContainer" id="textContainer">
        <h1 className="usersOnlineText"> Users Online</h1>
        <div className="textContent">
            {users.map((user) => <ol style={{margin: 10, padding: 0, listStyleType: 'none', textAlign: 'center'}}><li key={user.name}>{user.name}</li></ol>)}
        </div>
    </div>
)

export default TextContainer;