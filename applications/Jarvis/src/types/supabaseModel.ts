export type DbMessage = {
    id: string
    content: string
    role: 'user' | 'assistant'
    created_at: string
}

export type DbConversation = {
    id: string
    title: string
    flowise_chat_id: string | null
    created_at: string
    updated_at: string
    messages?: DbMessage[]
}
