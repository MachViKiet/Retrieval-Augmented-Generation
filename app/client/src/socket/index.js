
import { io } from 'socket.io-client';

let socket = null;
const domain = import.meta.env.VITE_SERVER

export const disconnectSocket = () => {
  if(socket){
    socket.disconnect();
    socket = null
  }

  return socket
}

export const connectSocket = (token) => {
  if (!socket) {
    socket = io( domain, {
      auth: {
        token: token, // Truyền token vào trong auth
      },
      transports: ['websocket'], // Chỉ sử dụng WebSocket
      reconnection: true, // Tự động kết nối lại khi bị ngắt
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  return socket;
};



export const getSocket = () => socket;