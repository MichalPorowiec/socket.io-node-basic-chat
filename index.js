const express = require('express');
const socket = require('socket.io');

const app = express();
const serverPort = '4000';
const server = app.listen(serverPort, () => console.log(`listening on port ${serverPort}`))

app.use(express.static('static-middleware'))

const io = socket(server);

io.on('connection', (socket) => {
    socket.on('chat-message', (messageObject) => {
        io.sockets.emit('chat-message', messageObject)
    })

    socket.on('chat-broadcast', (broadcastPerson) => {
        socket.broadcast.emit('chat-broadcast', {userName: broadcastPerson})
    })
})