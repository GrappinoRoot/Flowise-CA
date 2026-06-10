import { supabase } from '../lib/supabaseClient'
import { setState, getState, dispatchStore } from '../store/store'
import type { DbConversation } from '../types/supabaseModel'
import { mapDbConversationToConversation } from '../mappers/conversationMapper'

export async function initApp() {
    const { data: convs, error } = await supabase.from('conversations').select('*, messages(*)').order('updated_at', { ascending: false })

    if (error) {
        console.error('Errore nel caricamento iniziale:', error)
        return
    }

    if (!convs) return

    const mappedConversations = (convs as DbConversation[]).map(mapDbConversationToConversation)

    if (mappedConversations.length === 0) {
        dispatchStore('CONVERSATION_CREATED', {
            Id: crypto.randomUUID(),
            title: 'New Chat'
        })
        return
    }

    const state = getState()

    setState({
        ...state,
        conversations: mappedConversations,
        activeConversationId: mappedConversations[0].Id
    })
}
