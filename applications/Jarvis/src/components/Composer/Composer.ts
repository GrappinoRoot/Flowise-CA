import template from './Composer.html?raw'
import './Composer.css'
import { dispatchStore } from '../../store/store'
import { getElement } from '../../utils/getElement'
import { Button } from '../../components/Button/Button'

export function mountComposer(container: HTMLElement) {
    container.innerHTML = template

    const formElement = getElement<HTMLFormElement>(container, '[data-composer-form]')
    const inputElement = getElement<HTMLInputElement>(container, '[data-composer-input]')
    const submitButtonContainer = getElement<HTMLDivElement>(container, '[data-submit-button]')

    const submitButton = new Button({
        label: 'Invia',
        type: 'submit',
        variant: 'primary'
    })
    submitButtonContainer.prepend(submitButton.render())

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
