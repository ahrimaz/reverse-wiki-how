const { Server: HttpServer } = require('http');
const { NextApiRequest, NextApiResponse } = require('next');
const { Server: SocketIOServer } = require('socket.io');

type NextApiResponseWithSocket = typeof NextApiResponse & {
  socket: {
    server: typeof HttpServer & {
      io?: typeof SocketIOServer;
    };
  };
};

const ioHandler = (req: typeof NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket?.server && !res.socket.server.io) {
    console.log('Setting up Socket.IO server...');
    const httpServer: typeof HttpServer = res.socket.server;
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
