const { Server: SocketIOServer } = require('socket.io');
const { NextApiRequest, NextApiResponse } = require('next');
import { Socket } from 'socket.io';

const ioHandler = (req: typeof NextApiRequest, res: typeof NextApiResponse) => {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.IO server...');
    const httpServer = res.socket.server;
    const io = new SocketIOServer(httpServer, {
      path: '/api/socket',
    });

    io.on('connection', (socket: Socket) => {
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

module.exports = ioHandler;
