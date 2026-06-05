import type { Middleware } from './types'
import { sendToFlowise } from '../api/flowiseClient'
import { ERRORS } from '../utils/errors'
import { getState } from '../store/store'

export const chatMiddleware: Middleware = (type, payload, context) => {
    switch (type) {
        case 'USER_MESSAGE_SUBMITTED': {
            const p = payload as { conversationId: string; content: string }

            // ----------------------------
            // 1. RESOLVE CONVERSATION ID
            // ----------------------------
            const state = getState()

            let conversationId = state.activeConversationId

            if (!conversationId) {
                conversationId = crypto.randomUUID()

                context.dispatch('CONVERSATION_CREATED', {
                    Id: conversationId,
                    title: 'New Chat'
                })
            }

            // ----------------------------
            // 2. CHECK FIRST MESSAGE (BEFORE USER MESSAGE DISPATCH)
            // ----------------------------
            const freshState = getState()

            const conversation = freshState.conversations.find((c) => c.Id === conversationId)

            const isFirstMessage = (conversation?.messages.length ?? 0) === 0

            // ----------------------------
            // 3. USER MESSAGE
            // ----------------------------
            context.dispatch('MESSAGE_ADDED', {
                conversationId,
                message: {
                    id: crypto.randomUUID(),
                    role: 'user',
                    content: p.content,
                    createdAt: Date.now()
                }
            })

            // ----------------------------
            // 4. LOADING
            // ----------------------------
            context.dispatch('LOADING_STARTED', undefined)

            // ----------------------------
            // 5. RENAME CONVERSATION (FIRST MESSAGE ONLY)
            // ----------------------------
            if (isFirstMessage) {
                context.dispatch('CONVERSATION_RENAMED', {
                    conversationId,
                    title: p.content.slice(0, 30)
                })
            }

            // ----------------------------
            // 6. ASYNC FLOWISE CALL
            // ----------------------------
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

                    context.dispatch('MESSAGE_ADDED', {
                        conversationId,
                        message: {
                            id: crypto.randomUUID(),
                            role: 'assistant',
                            content: ERRORS.FLOWISE_REQUEST_FAILED,
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
