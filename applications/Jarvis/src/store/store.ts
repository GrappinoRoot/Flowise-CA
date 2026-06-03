import type { AppState } from '../types/chat'
import { reducer } from './reducer'
import { notify } from './subscribers'
import type { ActionType, ActionPayloadMap } from './actions'
import { runMiddlewares } from '../middleware/middleware'
import { actions } from './actions'

let state: AppState = {
    conversations: [
        {
            Id: 'default',
            title: 'Nuova Conversazione',
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
    ],
    activeConversationId: 'default',
    loading: false
}

export function getState(): AppState {
    return state
}

export function setState(newState: AppState) {
    state = newState
    notify()
}

export function dispatchStore<K extends ActionType>(type: K, payload: ActionPayloadMap[K]) {
    runMiddlewares(type, payload, {
        dispatch: dispatchStore
    })

    const action = actions[type]
    const processedPayload = action.process(payload)

    state = reducer(state, type, processedPayload as ActionPayloadMap[ActionType])
    notify()
}
