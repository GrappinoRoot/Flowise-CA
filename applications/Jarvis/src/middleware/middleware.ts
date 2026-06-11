import type { Middleware } from './types'

const middlewares: Middleware[] = []

export function registerMiddleware(middleware: Middleware) {
    middlewares.push(middleware)
}

export async function runMiddlewares(
    type: Parameters<Middleware>[0],
    payload: Parameters<Middleware>[1],
    context: Parameters<Middleware>[2]
) {
    for (const middleware of middlewares) {
        await middleware(type, payload, context)
    }
}
