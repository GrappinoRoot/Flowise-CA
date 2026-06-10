import type { Conversation, ChatMessage } from '../types/chat'
import type { DbConversation } from '../types/supabaseModel'

export function mapDbConversationToConversation(conv: DbConversation): Conversation {
    return {
        Id: conv.id,
        title: conv.title,
        flowiseChatId: conv.flowise_chat_id,

        messages: (conv.messages ?? [])
            .map(
                (m): ChatMessage => ({
                    Id: m.id,
                    content: m.content,
                    role: m.role,
                    createdAt: new Date(m.created_at).getTime()
                })
            )
            .sort((a, b) => a.createdAt - b.createdAt),

        createdAt: new Date(conv.created_at).getTime(),
        updatedAt: new Date(conv.updated_at).getTime()
    }
}
