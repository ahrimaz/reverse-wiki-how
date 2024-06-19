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
    io = new Server({
      cors: {
        origin: process.env.NEXT_PUBLIC_CLIENT_URL,
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log(`[${socket.id}] New user connected`);

      socket.on('slideChange', (slideIndex) => {
        console.log(`[${socket.id}] Slide changed to: ${slideIndex}`);
        io.emit('slideChange', slideIndex); // Broadcast to all connected clients
      });

      socket.on('disconnect', () => {
        console.log(`[${socket.id}] User disconnected`);
      });
    });
  } else {
    console.log('Socket.IO server already set up.');
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_CLIENT_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.end();
};

export default ioHandler;
