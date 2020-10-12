import { DeviceEventEmitter } from 'react-native';

export enum ManagerEvents {
  CHANGE_TEXT = 'CHANGE_TEXT',
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
}

export const changeText = (text: string) => {
  console.log('Emit event changeText');
  DeviceEventEmitter.emit(ManagerEvents.CHANGE_TEXT, text);
}

export const clearText = () => {
  console.log('Emit event clearText');
  DeviceEventEmitter.emit(ManagerEvents.CHANGE_TEXT, 'khai da cleaText');
}

export const receiveMessage = (message: string) => {
  console.log('receiveMessgae', message);
  DeviceEventEmitter.emit(ManagerEvents.RECEIVE_MESSAGE, message);
}

