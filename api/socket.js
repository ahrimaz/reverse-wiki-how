import { Server } from 'socket.io';

export const config = {
  api: {
    bodyParser: false,
  },
};

let io;

const ioHandler = (req, res) => {
  if (!io) {
    console.log('Setting up Socket.IO server...');
    io = new Server(res.socket.server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_CLIENT_URL,
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('New user connected');

      socket.on('slideChange', (slideIndex) => {
        console.log(`Slide changed to: ${slideIndex}`);
        socket.broadcast.emit('slideChange', slideIndex);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('Socket.IO server already set up.');
  }
  res.end();
};

export default ioHandler;
