if (process.env.NOW_LOGS_SECRET_KEY) {
    require('now-logs')(process.env.NOW_LOGS_SECRET_KEY);
}

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.use(express.static('website'));

io.on('connection', (socket) => {
    console.log('Connection. Number of connected sockets', io.engine.clientsCount);
    socket.on('disconnect', () => {
        console.log('Disconnect. Number of connected sockets', io.engine.clientsCount);
    });
    socket.on('room', (room) => {
        socket.join(room);
    });
    socket.on('emit-room', (room, text) => {
        io.to(room).emit('message', text);
    });
});

http.listen(port, () => {
    console.log('listening on port', port);
});