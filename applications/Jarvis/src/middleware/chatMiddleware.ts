import type { Middleware } from './types'
import { sendToFlowise } from '../api/flowiseClient'
import { ERRORS } from '../utils/errors'
import { getState } from '../store/store'

export const chatMiddleware: Middleware = (type, payload, context) => {
    switch (type) {
        case 'USER_MESSAGE_SUBMITTED': {
            const state = getState()
            console.log('state:', state)
            let conversationId = state.activeConversationId

            const p = payload as { conversationId: string; content: string }

            if (!conversationId) {
                conversationId = crypto.randomUUID()

                context.dispatch('CONVERSATION_CREATED', {
                    Id: conversationId,
                    title: 'New Chat'
                })
            }

            // step 1: user message
            context.dispatch('MESSAGE_ADDED', {
                conversationId,
                message: {
                    id: crypto.randomUUID(),
                    role: 'user',
                    content: p.content,
                    createdAt: Date.now()
                }
            })

            context.dispatch('LOADING_STARTED', undefined)

            // step 2: async flowise call
            void (async () => {
                try {
                    const response = await sendToFlowise(p.content)

                    context.dispatch('MESSAGE_ADDED', {
                        conversationId,
                        message: {
                            id: crypto.randomUUID(),
                            role: 'assistant',
                            content: response.text ?? '',
                            createdAt: Date.now()
                        }
                    })
                } catch (error) {
                    console.error(error)

                    const message = ERRORS.FLOWISE_REQUEST_FAILED

                    context.dispatch('MESSAGE_ADDED', {
                        conversationId,
                        message: {
                            id: crypto.randomUUID(),
                            role: 'assistant',
                            content: message,
                            createdAt: Date.now()
                        }
                    })
                } finally {
                    context.dispatch('LOADING_FINISHED', undefined)
                }
            })()
            break
        }
    }
}
