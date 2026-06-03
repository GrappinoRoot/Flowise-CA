import type { ActionPayloadMap, ActionType } from '../store/actions'

export type MiddlewareContext = {
    dispatch: <K extends ActionType>(type: K, payload: ActionPayloadMap[K]) => void
}

export type Middleware = <K extends ActionType>(type: K, payload: ActionPayloadMap[K], context: MiddlewareContext) => void
