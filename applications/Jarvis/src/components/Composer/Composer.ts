import template from './Composer.html?raw'
import './Composer.css'
import { dispatchStore } from '../../store/store'
import { ERRORS } from '../../utils/errors'

export function mountComposer(container: HTMLElement) {
    container.innerHTML = template

    const formElement = container.querySelector<HTMLFormElement>('[data-composer-form]')
    const inputElement = container.querySelector<HTMLInputElement>('[data-composer-input]')

    if (!formElement || !inputElement) {
        console.error(ERRORS.COMPOSER_ELEMENTS_NOT_FOUND)
        throw new Error(ERRORS.COMPOSER_ELEMENTS_NOT_FOUND)
    }

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault()

        const value = inputElement.value.trim()
        if (!value) {
            return
        }

        dispatchStore('USER_MESSAGE_SUBMITTED', {
            content: value
        })

        inputElement.value = ''
    })
}
