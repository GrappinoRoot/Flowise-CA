import type { AppState } from '../../types/chat'
import type { ActionPayloadMap } from '../actions'

export function createConversation(currentState: AppState, payload: ActionPayloadMap['CONVERSATION_CREATED']): AppState {
    return {
        ...currentState,
        conversations: [
            ...currentState.conversations,
            {
                Id: payload.Id,
                title: payload.title,
                messages: [],
                flowiseChatId: null, // Inizializza flowiseChatId
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
        ],
        activeConversationId: payload.Id
    }
}

export function renameConversation(currentState: AppState, payload: ActionPayloadMap['CONVERSATION_RENAMED']): AppState {
    return {
        ...currentState,
        conversations: currentState.conversations.map((c) =>
            c.Id === payload.conversationId
                ? {
                      ...c,
                      title: payload.title,
                      updatedAt: Date.now()
                  }
                : c
        )
    }
}

export function deleteConversation(currentState: AppState, payload: ActionPayloadMap['CONVERSATION_DELETED']): AppState {
    const conversations = currentState.conversations.filter((c) => c.Id !== payload.conversationId)

    const activeConversationId = currentState.activeConversationId === payload.conversationId ? null : currentState.activeConversationId

    return {
        ...currentState,
        conversations,
        activeConversationId
    }
}

export function selectConversation(currentState: AppState, payload: ActionPayloadMap['CONVERSATION_SELECTED']): AppState {
    return {
        ...currentState,
        activeConversationId: payload.conversationId
    }
}
