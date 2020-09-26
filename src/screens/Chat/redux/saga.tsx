import _ from "lodash";
import { channel } from "redux-saga";
import { delay, put, select } from "redux-saga/effects";
import { ChatGetAnErrorAction, ChatSendTextRequestAction, EmitTextSuccessAction, IChatSendTextRequestAction } from "./actions";
import { TextMessageEmitEventModel } from "./types";

const emitTextSuccessChannel = channel();

function* sendTextMessage(action: IChatSendTextRequestAction) {
  try {
    yield delay(75);
    const message = action.payload;
    // socket && socket.emit(
    //   CHAT_EVENT.NEW_TEXT_MESSAGE,
    //   message,
    //   (message: TextMessageEmitServerCallback) => emitTextSuccessChannel.put(EmitTextSuccessAction({ ...message, id: message.messageId })));
    emitTextSuccessChannel.put(EmitTextSuccessAction({...message, messageId: message.id}));
  } catch (e) {
    yield put(ChatGetAnErrorAction({ ...e, message: 'Xảy ra lỗi khi gửi tin nhắn.' }));
  }
}

function* considerSendMessage() {
  yield delay(75);
  // const { queue, sending } = yield select((state: IStoreState) => ({ queue: state.Socket.queue, sending: state.Socket.sending }));
  const queue = {};
  const sending = undefined;
  if (sending === undefined) {
    const q: {
      [key: string]: TextMessageEmitEventModel[] | undefined;
    } = queue;
    const conversationId = Object.keys(q).find((key) => {
      const element = q[key];
      return element && element.length > 0;
    });
    if (conversationId) {

      const pendingList = _.get(q, `${conversationId}`, undefined);
      if (pendingList && pendingList.length > 0) {
        yield put(ChatSendTextRequestAction(pendingList[0]))
      }
    }
  }
}