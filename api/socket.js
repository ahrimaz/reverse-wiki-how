const { Server: SocketIOServer } = require('socket.io');

const ioHandler = (req, res) => {
  if (res.socket && res.socket.server && !res.socket.server.io) {
    console.log('Setting up Socket.IO server...');
    const httpServer = res.socket.server;
    const io = new SocketIOServer(httpServer, {
      path: '/api/socket',
    });

    io.on('connection', (socket) => {
      console.log('New user connected');

      socket.on('slideChange', (slideIndex) => {
        socket.broadcast.emit('slideChange', slideIndex);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

module.exports = ioHandler;
