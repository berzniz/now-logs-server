module.exports = function setupServer(io) {
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
        })
    });

    return io;
};
