import type { AppState } from '../types/chat'

export const state: AppState = {
    conversations: [],
    activeConversationId: null,
    loading: false
}
