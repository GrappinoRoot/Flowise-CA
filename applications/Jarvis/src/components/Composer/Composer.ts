import template from './Composer.html?raw'
import './Composer.css'
import { dispatchStore } from '../../store/store'

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

        dispatchStore('USER_MESSAGE_SUBMITTED', {
            conversationId: 'default',
            content: value
        })

        inputElement.value = ''
    })
}
