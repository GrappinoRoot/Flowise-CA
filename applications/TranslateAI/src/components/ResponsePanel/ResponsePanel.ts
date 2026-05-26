import template from './ResponsePanel.html?raw'
import './ResponsePanel.css'

type ResponsePanelApi = {
    setIdle: () => void
    setLoading: () => void
    setResponse: (message: string) => void
    setError: (message: string) => void
}

export function mountResponsePanel(container: HTMLElement): ResponsePanelApi {
    container.innerHTML = template

    const responseBox = container.querySelector<HTMLPreElement>('[data-response-box]')

    if (!responseBox) {
        throw new Error('ResponsePanel elements not found')
    }

    return {
        setIdle() {
            responseBox.textContent = 'Nessuna risposta ancora.'
        },
        setLoading() {
            responseBox.textContent = 'Generazione risposta in corso...'
        },
        setResponse(message: string) {
            responseBox.textContent = message
        },
        setError(message: string) {
            responseBox.textContent = `Errore: ${message}`
        }
    }
}
