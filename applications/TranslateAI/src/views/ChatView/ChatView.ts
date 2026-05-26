import template from './ChatView.html?raw'
import './ChatView.css'
import { sendMessageToFlowise } from '../../flowiseClient'
import { mountPromptForm } from '../../components/PromptForm/PromptForm'
import { mountResponsePanel } from '../../components/ResponsePanel/ResponsePanel'

export function mountChatView(container: HTMLElement): void {
    container.innerHTML = template

    const promptFormContainer = container.querySelector<HTMLElement>('[data-prompt-form-container]')
    const responsePanelContainer = container.querySelector<HTMLElement>('[data-response-panel-container]')

    if (!promptFormContainer || !responsePanelContainer) {
        throw new Error('ChatView elements not found')
    }

    const responsePanel = mountResponsePanel(responsePanelContainer)

    mountPromptForm(promptFormContainer, {
        async onSubmit(question: string) {
            responsePanel.setLoading()

            try {
                const response = await sendMessageToFlowise(question)

                responsePanel.setResponse(response.text ?? 'Nessuna risposta testuale ricevuta.')
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown error'
                responsePanel.setError(message)
            }
        }
    })
}
