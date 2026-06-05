import template from './Composer.html?raw'
import './Composer.css'
import { dispatchStore } from '../../store/store'
import { getElement } from '../../utils/getElement'
import { createButton } from '../../components/Button/Button'

export function mountComposer(container: HTMLElement) {
    container.innerHTML = template

    const formElement = getElement<HTMLFormElement>(container, '[data-composer-form]')
    const inputElement = getElement<HTMLInputElement>(container, '[data-composer-input]')
    const submitButtonContainer = getElement<HTMLDivElement>(container, '[data-submit-button]')

    const submitButton = createButton({
        label: 'Invia',
        type: 'submit',
        className: 'button'
    })
    submitButtonContainer.appendChild(submitButton)

    formElement.addEventListener('submit', (event) => {
        event.preventDefault()

        const value = inputElement.value.trim()

        if (!value) return

        dispatchStore('USER_MESSAGE_SUBMITTED', {
            content: value
        })

        inputElement.value = ''
    })
}
