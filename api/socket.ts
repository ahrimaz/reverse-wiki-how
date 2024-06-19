import { Server as HttpServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: HttpServer & {
      io?: SocketIOServer;
    };
  };
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket?.server && !res.socket.server.io) {
    console.log('Setting up Socket.IO server...');
    const httpServer: HttpServer = res.socket.server;
    const io = new SocketIOServer(httpServer, {
      path: '/api/socket',
    });

    io.on('connection', (socket) => {
      console.log('New user connected');

      socket.on('slideChange', (slideIndex: number) => {
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

// Export using CommonJS syntax
module.exports = ioHandler;
