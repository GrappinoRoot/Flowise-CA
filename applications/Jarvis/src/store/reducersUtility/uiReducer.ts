import type { AppState } from '../../types/chat'

export function startLoading(currentState: AppState): AppState {
    return {
        ...currentState,
        loading: true
    }
}

export function stopLoading(currentState: AppState): AppState {
    return {
        ...currentState,
        loading: false
    }
}
