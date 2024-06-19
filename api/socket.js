const { Server } = require('socket.io');

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.IO server...');
    const io = new Server(res.socket.server);

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

export default ioHandler;
