const ENDPOINT = 'http://127.0.0.1:4001';
import { emitNotification } from 'expo/build/Notifications/Notifications';
import socketIOClient from 'socket.io-client';
import { receiveMessage } from './manager';

export interface receiverSchema {
  receiveData: (data: any) => void;
  receiveMessage: (message: string) => void;
}

let socket: SocketIOClient.Socket | undefined;

export let receiver : receiverSchema = {
  receiveData: (a) => console.log(a),
  receiveMessage: (b) => console.log(b)
}

export const initialSocket = () => {
  socket = socketIOClient(ENDPOINT);

  // socket.on('FromAPI', receiver.receiveData);

  socket.on('sendMessage', receiveMessage);
}

export const joinRoom = (roomId: string) => socket?.emit('joinRoom', roomId);

export const sendDataToServer = () => socket?.emit('ClientToServer', 'Hello, My name is Khai');

export const sendMessageToServer = (message: string, roomId: string) => socket?.emit('sendMessage', {message, roomId});

export const closeSocket = () => {
  if (socket) socket.close()
}