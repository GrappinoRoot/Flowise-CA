import type { AppState, Conversation } from '../types/chat'
import type { ActionPayloadMap, ActionType } from './actions'

export function reducer(currentState: AppState, type: ActionType, payload: ActionPayloadMap[ActionType]): AppState {
    switch (type) {
        case 'CONVERSATION_CREATED':
            return {
                ...currentState,
                conversations: [...currentState.conversations, payload as Conversation]
            }

        case 'CONVERSATION_SELECTED':
            return {
                ...currentState,
                activeConversationId: (payload as ActionPayloadMap['CONVERSATION_SELECTED']).conversationId
            }

        case 'MESSAGE_ADDED':
            return {
                ...currentState,
                conversations: currentState.conversations.map((conversation) => {
                    const messagePayload = payload as ActionPayloadMap['MESSAGE_ADDED']

                    if (conversation.Id !== messagePayload.conversationId) {
                        return conversation
                    }

                    return {
                        ...conversation,
                        messages: [...conversation.messages, messagePayload.message],
                        updatedAt: Date.now()
                    }
                })
            }

        case 'LOADING_STARTED':
            return { ...currentState, loading: true }

        case 'LOADING_FINISHED':
            return { ...currentState, loading: false }

        default:
            return currentState
    }
}
