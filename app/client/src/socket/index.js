
import { io } from 'socket.io-client';

let socket = null;
const domain = import.meta.env.VITE_SERVER
const env = import.meta.env?.VITE_ENVIRONMENT

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
      env == 'development' && console.log('Socket connected:', socket.id);
    });

    socket.on('connect_error', (err) => {
      socket = null
      env == 'development' &&  console.error('Connection error:', err.message);
    });

    socket.on('disconnect', () => {
      socket = null
      env == 'development' &&  console.error('Socket disconnected');
    });
  }

  return socket;
};



export const getSocket = () => socket;