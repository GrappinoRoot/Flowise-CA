import type { Middleware } from './types'
import type { ActionPayloadMap } from '../store/actions'
import { sendToFlowise } from '../api/flowiseClient'

export const chatMiddleware: Middleware = (type, payload, context) => {
    switch (type) {
        case 'USER_MESSAGE_SUBMITTED': {
            const p = payload as ActionPayloadMap['USER_MESSAGE_SUBMITTED']

            // step 1: user message
            context.dispatch('MESSAGE_ADDED', {
                conversationId: p.conversationId,
                message: {
                    id: crypto.randomUUID(),
                    role: 'user',
                    content: p.content,
                    createdAt: Date.now()
                }
            })

            // step 2: async flowise call
            void (async () => {
                const response = await sendToFlowise(p.content)

                context.dispatch('MESSAGE_ADDED', {
                    conversationId: p.conversationId,
                    message: {
                        id: crypto.randomUUID(),
                        role: 'assistant',
                        content: response.text ?? '',
                        createdAt: Date.now()
                    }
                })
            })()

            break
        }
    }
}
