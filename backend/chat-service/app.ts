// Credits: https://github.com/imgitto/Simple-File-Sharing-App/blob/main/public/code.js
// For providing inspiration for the file sharing functions

import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { Message } from '../../frontend/src/types/chat/messages';
import { User } from '../../frontend/src/types/users/users';
import { join } from 'lodash';

const FRONTEND_URL = process.env.FRONTEND_URL as string;
const SOCKET_IO_PORT = process.env.SOCKET_IO_PORT as string;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a separate server for Socket.IO.
const app = express();
app.use(
  cors({ origin: FRONTEND_URL, optionsSuccessStatus: 200, credentials: true }),
);
const httpServer = createServer(app);

// Create a Socket.IO instance HTTP server.
const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
  },
}); 

httpServer.listen(SOCKET_IO_PORT, () => {
  console.log(`Socket.io server is listening on http://localhost:${SOCKET_IO_PORT}`);
});

// Handle other collaboration features.
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Listen for room joining.
  socket.on('join-room', (roomId: string, joinedUser: User) => {
    // Join the user to the specified room.
    socket.join(roomId);
    // io.emit('joined-room', joinedUser);
  });

  // Listen for chat messages.
  socket.on('chat-message', (roomId: string, message: Message) => {
    // Broadcast the message to all connected clients.
    io.emit('receive-chat-message', message);
  });

  socket.on('file-meta',function(data){
		socket.in(data.uid).emit('fs-meta', data.metadata);
	});

	socket.on('fs-start',function(data){
		socket.in(data.uid).emit('fs-share', {});
	});

	socket.on('file-raw',function(data){
		socket.in(data.uid).emit('fs-share', data.buffer);
	})

  // Handle user disconnection.
  socket.on('disconnect', () => { // roomId: string
    // socket.leave(roomId); // more correct?
    // socket?.disconnect(); // not correct?
    console.log('User disconnected:', socket.id);
  });
});
