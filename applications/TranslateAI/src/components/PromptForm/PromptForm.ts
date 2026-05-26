import template from './PromptForm.html?raw'
import './PromptForm.css'

type PromptFormOptions = {
    onSubmit: (question: string) => void
}

export function mountPromptForm(container: HTMLElement, options: PromptFormOptions): void {
    container.innerHTML = template

    const form = container.querySelector<HTMLFormElement>('[data-prompt-form]')
    const input = container.querySelector<HTMLInputElement>('[data-prompt-input]')

    if (!form || !input) {
        throw new Error('PromptForm elements not found')
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const question = input.value.trim()

        if (!question) {
            return
        }

        options.onSubmit(question)
        input.value = ''
    })
}
