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

    // Creating a new Socket.IO server instance
    io = new Server({
      cors: {
        origin: process.env.NEXT_PUBLIC_CLIENT_URL, // Ensure to set this correctly
        methods: ['GET', 'POST'],
      },
      transports: ['websocket', 'polling'], // Add polling transport for compatibility
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

    // Attach the Socket.IO server to the response object
    res.socket.server.io = io;
  } else {
    console.log('Socket.IO server already set up.');
  }

  // Respond to the request
  res.end();
};

export default ioHandler;
