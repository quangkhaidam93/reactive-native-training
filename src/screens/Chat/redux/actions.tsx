import { IAction } from "sagas/baseTypes";
import { MessageListTypes, TextMessageEmitEventModel, ActionGetErrorChat, TextMessageEmitServerCallback, ActionEmitTextSuccess } from "./types";

export interface IChatSendTextRequestAction
  extends IAction<MessageListTypes.SEND_TEXT_MESSAGE, TextMessageEmitEventModel> {
  payload: TextMessageEmitEventModel;
}

export function ChatGetAnErrorAction(payload: Error): ActionGetErrorChat {
  return {
    type: MessageListTypes.GET_ERROR_CHAT,
    payload
  };
}

export function EmitTextSuccessAction(message: TextMessageEmitServerCallback): ActionEmitTextSuccess {
  return {
    type: MessageListTypes.EMIT_TEXT_SUCCESS,
    payload: message
  };
}

export function ChatSendTextRequestAction(payload: TextMessageEmitEventModel): IChatSendTextRequestAction {
  return {
    type: MessageListTypes.SEND_TEXT_MESSAGE,
    payload
  };
}