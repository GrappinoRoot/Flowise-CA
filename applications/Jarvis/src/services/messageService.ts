import { supabase } from '../lib/supabaseClient'
import type { ActionPayloadMap } from '../store/actions'

export async function saveMessage(payload: ActionPayloadMap['MESSAGE_ADDED']) {
    const { conversationId, message } = payload

    const { error } = await supabase.from('messages').insert({
        id: message.Id,
        conversation_id: conversationId,
        content: message.content,
        role: message.role,
        created_at: new Date(message.createdAt).toISOString()
    })

    if (error) {
        console.error('MESSAGE_ADDED error:', error)
    }
}
