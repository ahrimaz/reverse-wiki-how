// api/socket.ts
import { Server as HttpServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

const ioHandler = (req: NextApiRequest, res: NextApiResponse & { socket: { server?: any } }) => {
  if (res.socket && res.socket.server && !res.socket.server.io) {
    console.log('Setting up Socket.IO server...');
    const httpServer: HttpServer = res.socket.server as any;
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

export default ioHandler;
