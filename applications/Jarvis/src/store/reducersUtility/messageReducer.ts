import type { AppState } from '../../types/chat'
import type { ActionPayloadMap } from '../actions'

export function addMessage(currentState: AppState, payload: ActionPayloadMap['MESSAGE_ADDED']): AppState {
    return {
        ...currentState,
        conversations: currentState.conversations.map((conversation) => {
            if (conversation.Id !== payload.conversationId) {
                return conversation
            }

            return {
                ...conversation,
                messages: [...conversation.messages, payload.message],
                updatedAt: Date.now()
            }
        })
    }
}
