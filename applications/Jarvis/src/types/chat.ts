export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
    Id: string
    role: ChatRole
    content: string
    createdAt: number
}

export type Conversation = {
    Id: string
    title: string
    messages: ChatMessage[]
    createdAt: number
    updatedAt: number
    flowiseChatId?: string
}

export type AppState = {
    conversations: Conversation[]
    activeConversationId: string | null
    loading: boolean
}
