import type { Middleware } from './types'

export const chatMiddleware: Middleware = (type, payload, context) => {
    console.log('[chatMiddleware]', type, payload, context)
}
