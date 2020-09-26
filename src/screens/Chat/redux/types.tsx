import { Pageable } from "models/Pageable";
import { IAction, RequestStatus } from "sagas/baseTypes";


export interface MessageItems {
  
}

type TEXT_TYPE = 'TEXT';
type INFO_TYPE = 'INFO';
type VIDEO_TYPE = 'VIDEO';
type SOUND_TYPE = 'SOUND';
type IMAGE_TYPE = 'IMAGE';
type LOCATION_TYPE = 'LOCATION';
type OFFER_TYPE = 'OFFER';
type UNKNOWN_TYPE = 'UNKNOWN';
type WARNING_TYPE = 'WARNING';
type REQUEST_UNLOCK_CONVERSATION_TYPE = 'REQUEST_UNLOCK_CONVERSATION';

export type MessageTypes = TEXT_TYPE | VIDEO_TYPE | INFO_TYPE | SOUND_TYPE | IMAGE_TYPE | LOCATION_TYPE | OFFER_TYPE | UNKNOWN_TYPE | WARNING_TYPE | REQUEST_UNLOCK_CONVERSATION_TYPE;

interface MessageBase<T = MessageTypes> {
  id: number;
  guid: string;
  conversationId: number;
  senderId: number;
  createdAt: string;
  onlyForUserId?: number;
  messageType: T;
}

export interface UserInfo { id: number | string, name?: string, avatar?: string };

export type MESSAGE_STATUS = 'PENDING' | 'SENDING' | 'SENT' | 'ERROR';

interface WithSender {
  sender?: UserInfo;
}

interface WithStatus {
  status: MESSAGE_STATUS;
}

export interface TextMessage extends MessageBase<TEXT_TYPE>, WithSender, WithStatus {
  text: string;
  mdText: string;
}

interface SocketEventModel {
  id: number, // roomId
  guid: string,
}

export interface TextMessageEmitEventModel extends SocketEventModel, TextMessage {
  message: string
}

export interface TextMessageEmitServerCallback extends TextMessageEmitEventModel {
  messageId: number
}

export enum MessageListTypes {
  MESSAGE_LIST_REQUEST = '@@MessageList/MESSAGE_LIST_REQUEST',
  MESSAGE_LIST_SUCCESS = '@@MessageList/MESSAGE_LIST_SUCCESS',
  MESSAGE_LIST_FAILURE = '@@MessageList/MESSAGE_LIST_FAILURE',
  NEW_MESSAGE_RECEIVE = '@@MessageList/NEW_MESSAFE_RECEIVE',
  PUSH_MESSAGE_TO_QUEUE = '@@MessageList/PUSH_MESSAGE_TO',
  SEND_TEXT_MESSAGE = '@@MessageList/SEND_TEXT_MESSAGE',
  GET_ERROR_CHAT = '@@MessageList/GET_ERROR_CHAT',
  EMIT_TEXT_SUCCESS = '@@MessageList/EMIT_TEXT_SUCCESS'
}

export interface IMessageListState {
  firstLoading: boolean;
  messageList: MessageItems[];
  messageListStatus?: RequestStatus;
  messageListPageable: Pageable;
  error?: Error;
}

interface IMessageListSuccessPayload {
  datas: MessageItems[];
  pageable: Pageable;
}

interface INewMessageReceivePayload {
  message: MessageItems;
  currentUserId?: number;
}

interface ActionMessageListRequest extends IAction<MessageListTypes.MESSAGE_LIST_REQUEST> {}
interface ActionMessageListSuccess extends IAction<MessageListTypes.MESSAGE_LIST_SUCCESS, IMessageListSuccessPayload> {}
interface ActionMessageListFailure extends IAction<MessageListTypes.MESSAGE_LIST_FAILURE, Error> {}
interface ActionNewMessageReceive extends IAction<MessageListTypes.NEW_MESSAGE_RECEIVE, INewMessageReceivePayload> {}
interface ActionPushMessageToQueue extends IAction<MessageListTypes.PUSH_MESSAGE_TO_QUEUE, TextMessageEmitEventModel> {}
interface ActionSendTextMessage extends IAction<MessageListTypes.SEND_TEXT_MESSAGE, TextMessageEmitEventModel> {}
export interface ActionGetErrorChat extends IAction<MessageListTypes.GET_ERROR_CHAT, Error> {}
export interface ActionEmitTextSuccess extends IAction<MessageListTypes.EMIT_TEXT_SUCCESS, TextMessageEmitServerCallback> {}

export type MessageListActions = ActionMessageListRequest
| ActionMessageListSuccess
| ActionMessageListFailure
| ActionNewMessageReceive
| ActionPushMessageToQueue
| ActionSendTextMessage
| ActionGetErrorChat
;