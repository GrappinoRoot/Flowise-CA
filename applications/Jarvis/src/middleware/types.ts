import type { ActionPayloadMap, ActionType } from '../store/actions'
import type { AppState } from '../types/chat'

export type MiddlewareContext = {
    dispatch: <K extends ActionType>(type: K, payload: ActionPayloadMap[K]) => void
    getState: () => AppState
}

export type Middleware = <K extends ActionType>(type: K, payload: ActionPayloadMap[K], context: MiddlewareContext) => void | Promise<void>
