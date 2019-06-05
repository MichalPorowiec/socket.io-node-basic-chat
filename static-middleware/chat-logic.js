const serverAddress = 'http://localhost:4000';
const frontEndSocket = io.connect(serverAddress);

const getMessage = () => {
    const userMessage = document.getElementById('chat-message').value;
    const userName =  document.getElementById('chat-name').value;

    frontEndSocket.emit('chat-message', {
        userMessage,
        userName
    })
}

const addMessage = (message, userName) => {
    const child = document.createElement('p');
    const childText = document.createTextNode(message);
    const childUserName = document.createElement('b');

    childUserName.appendChild(document.createTextNode(`${userName}: `));
    child.appendChild(childUserName);
    child.appendChild(childText);

    const messageBox = document.getElementById('chat-content').appendChild(child)
}

const setBroadcastingValue = (userName) => {
    if (userName) {
       document.getElementById('chat-broadcast').innerHTML = `<p>${userName} is writing a message...</p>`;
    } else {
        document.getElementById('chat-broadcast').innerHTML = ``;
    }
}

document.getElementById("chat-form").addEventListener('submit', (event) => {
    event.preventDefault();
    getMessage();
})

document.getElementById("chat-message").addEventListener('keydown', (event) => {
    const userName =  document.getElementById('chat-name').value;
    frontEndSocket.emit('chat-broadcast', userName);
})

document.getElementById("chat-message").addEventListener('blur', (event) => {
    frontEndSocket.emit('chat-broadcast', null);
})

frontEndSocket.on('chat-message', (messageObject) => {
    setBroadcastingValue();
    addMessage(messageObject.userMessage, messageObject.userName);
})

frontEndSocket.on('chat-broadcast', (userName) => {
    setBroadcastingValue(userName.userName);
})