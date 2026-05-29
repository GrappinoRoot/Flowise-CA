import { actions, type ActionPayloadMap, type ActionType } from './actions'

export function dispatch<K extends ActionType>(type: K, payload: ActionPayloadMap[K]) {
    return actions[type].process(payload)
}
