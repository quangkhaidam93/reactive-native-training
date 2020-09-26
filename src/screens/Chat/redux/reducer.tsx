import { IMessageListState, MessageItems, MessageListActions, MessageListTypes } from './types';

export const messageListInitialState : IMessageListState = {
  firstLoading: true,
  messageList: [],
  messageListStatus: undefined,
  messageListPageable: {
    limit: 10,
    offset: 0
  },
  error: undefined
}

export const messageListReducer = (state: IMessageListState, action: MessageListActions) : IMessageListState => {
  switch (action.type) {
    case MessageListTypes.MESSAGE_LIST_REQUEST:
      return {
        ...state,
        messageListStatus: 'REQUEST',
        error: undefined
      }
    case MessageListTypes.MESSAGE_LIST_SUCCESS: {
      const oldList = state.messageList || [];
      let newList: MessageItems[] = [];
      if (action.payload) {
        if (action.payload.pageable.offset === 0) {
          newList = action.payload.datas;
        }
        else newList = [...oldList, ...(action.payload.datas || [])]
      }
      return {
        ...state,
        firstLoading: false,
        messageListStatus: 'SUCCESS',
        messageList: newList,
        messageListPageable: {
          ...state.messageListPageable,
          limit: 10,
          offset: newList.length,
          last: !!(action.payload && action.payload.pageable.last)
        },
        error: undefined
      }
    }
    case MessageListTypes.MESSAGE_LIST_FAILURE:
      return {
        ...state,
        firstLoading: false,
        messageListStatus: 'FAILURE',
        error: action.payload
      }
    default: 
      return {...state}
  }
}