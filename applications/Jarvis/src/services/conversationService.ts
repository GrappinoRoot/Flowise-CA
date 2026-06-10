import { supabase } from '../lib/supabaseClient'
import type { ActionPayloadMap } from '../store/actions'

export async function createConversation(payload: ActionPayloadMap['CONVERSATION_CREATED']) {
    const { Id, title } = payload

    const { error } = await supabase.from('conversations').insert({
        id: Id,
        title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
        // flowise_chat_id sarà null di default nel DB o può essere impostato esplicitamente qui
    })

    if (error) {
        console.error('CONVERSATION_CREATED error:', error)
    }
}

export async function renameConversation(payload: ActionPayloadMap['CONVERSATION_RENAMED']) {
    const { conversationId, title } = payload as ActionPayloadMap['CONVERSATION_RENAMED']

    const { error } = await supabase
        .from('conversations')
        .update({
            title,
            updated_at: new Date().toISOString()
        })
        .eq('id', conversationId)

    if (error) {
        console.error('CONVERSATION_RENAMED error:', error)
    }
}

export async function deleteConversation(payload: ActionPayloadMap['CONVERSATION_DELETED']) {
    const { conversationId } = payload as ActionPayloadMap['CONVERSATION_DELETED']

    const { error } = await supabase.from('conversations').delete().eq('id', conversationId)

    if (error) {
        console.error('CONVERSATION_DELETED error:', error)
    }
}

export async function updateFlowiseChatId(conversationId: string, flowiseChatId: string) {
    const { error } = await supabase.from('conversations').update({ flowise_chat_id: flowiseChatId }).eq('id', conversationId)

    if (error) {
        console.error('UPDATE_FLOWISE_CHAT_ID error:', error)
    }
}
