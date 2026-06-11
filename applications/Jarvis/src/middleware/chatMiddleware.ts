import type { ActionType, ActionPayloadMap } from '../store/actions'
import type { MiddlewareContext } from './types'
import { sendToFlowise } from '../api/flowiseClient'
import { createConversation, renameConversation, deleteConversation, updateFlowiseChatId } from '../services/conversationService'
import { saveMessage } from '../services/messageService'

export const chatMiddleware = async <K extends ActionType>(
    type: K,
    payload: ActionPayloadMap[K],
    { dispatch, getState }: MiddlewareContext
) => {
    switch (type) {
        case 'USER_MESSAGE_SUBMITTED': {
            const { content } = payload
            const state = getState()
            const conversationId = state.activeConversationId

            if (!conversationId) {
                console.error('ERRORE: Impossibile inviare il messaggio. Nessuna conversazione attiva selezionata.') // Messaggio di errore consolidato
                return
            }

            // Trasformiamo l'input in un messaggio concreto per la UI e il DB
            dispatch('MESSAGE_ADDED', {
                conversationId,
                message: {
                    Id: crypto.randomUUID(),
                    content,
                    role: 'user',
                    createdAt: Date.now()
                }
            })

            // Avvia lo stato di caricamento per la UI
            dispatch('LOADING_STARTED', undefined)

            try {
                // Trova la conversazione corrente per ottenere flowise_chat_id
                const currentConversation = state.conversations.find((conv) => conv.Id === conversationId)
                const flowiseChatId = currentConversation?.flowiseChatId

                // Utilizziamo il client dedicato per la chiamata a Flowise
                const flowiseData = await sendToFlowise(content, flowiseChatId || undefined)

                const assistantResponseContent = flowiseData.text

                const newFlowiseChatId = flowiseData.chatId

                if (newFlowiseChatId && newFlowiseChatId !== flowiseChatId) {
                    await updateFlowiseChatId(conversationId, newFlowiseChatId)
                    // Sincronizziamo lo store locale con il nuovo ID ricevuto da Flowise
                    dispatch('FLOWISE_CHAT_ID_UPDATED', {
                        conversationId,
                        flowiseChatId: newFlowiseChatId
                    })
                }

                // Dispatch del messaggio dell'assistente
                dispatch('MESSAGE_ADDED', {
                    conversationId,
                    message: { Id: crypto.randomUUID(), content: assistantResponseContent, role: 'assistant', createdAt: Date.now() }
                })
            } catch (flowiseError) {
                console.error("Errore durante la chiamata all'API Flowise:", flowiseError)
                // Opzionalmente, puoi dispatchare un messaggio di errore alla UI
            } finally {
                // Termina lo stato di caricamento per la UI
                dispatch('LOADING_FINISHED', undefined)
            }
            break
        }

        case 'CONVERSATION_CREATED': {
            await createConversation(payload)
            break
        }

        case 'MESSAGE_ADDED': {
            await saveMessage(payload)
            break
        }

        case 'CONVERSATION_RENAMED': {
            await renameConversation(payload)
            break
        }

        case 'CONVERSATION_DELETED': {
            await deleteConversation(payload)
            break
        }

        default:
            break
    }
}
