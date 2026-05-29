import template from './Composer.html?raw'
import './Composer.css'
import { dispatchStore } from '../../store/store'
import { sendToFlowise } from '../../api/flowiseClient'

export function mountComposer(container: HTMLElement) {
    container.innerHTML = template

    const formElement = container.querySelector<HTMLFormElement>('[data-composer-form]')
    const inputElement = container.querySelector<HTMLInputElement>('[data-composer-input]')

    if (!formElement || !inputElement) {
        throw new Error('Composer elements not found')
    }

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault()

        const value = inputElement.value.trim()
        if (!value) {
            return
        }

        dispatchStore('MESSAGE_ADDED', {
            conversationId: 'default',
            message: {
                id: '1',
                role: 'user',
                content: value,
                createdAt: Date.now()
            }
        })

        inputElement.value = ''

        try {
            const response = await sendToFlowise(value)

            dispatchStore('MESSAGE_ADDED', {
                conversationId: 'default',
                message: {
                    id: response.chatMessageId,
                    role: 'assistant',
                    content: response.text,
                    createdAt: Date.now()
                }
            })
        } catch (error) {
            console.error(error)
        }
    })
}
