import { getState } from './store'

type Listener = (state: ReturnType<typeof getState>) => void

const subscribers = new Set<Listener>()

export function subscribe(listener: Listener) {
    subscribers.add(listener)

    return () => {
        subscribers.delete(listener)
    }
}

export function notify() {
    const state = getState()

    subscribers.forEach((listener) => {
        listener(state)
    })
}
