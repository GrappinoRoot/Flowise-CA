import template from './AuthView.html?raw'
import './AuthView.css'

import { mountSignInForm } from '../../components/SignInForm/SignInForm'
import { mountSignUpForm } from '../../components/SignUpForm/SignUpForm'

type AuthMode = 'signin' | 'signup'

export function mountAuthView(container: HTMLElement) {
    container.innerHTML = template

    const authFormElement = container.querySelector('[data-auth-form]') as HTMLDivElement
    const subtitleElement = container.querySelector('[data-auth-subtitle]') as HTMLParagraphElement
    const switchModeBtn = container.querySelector('[data-switch-mode]') as HTMLButtonElement

    let authMode: AuthMode = 'signin'

    // Funzione per passare alla modalità di accesso
    const switchToSignIn = () => {
        authMode = 'signin'
        render()
    }

    function render() {
        authFormElement.replaceChildren()

        if (authMode === 'signin') {
            subtitleElement.textContent = 'Sign in to continue'
            switchModeBtn.textContent = 'Create account'

            mountSignInForm(authFormElement)
        } else {
            subtitleElement.textContent = 'Create your account'
            switchModeBtn.textContent = 'Already have an account'

            // Passa la funzione switchToSignIn al mountSignUpForm
            mountSignUpForm(authFormElement, switchToSignIn)
        }
    }

    switchModeBtn.addEventListener('click', () => {
        authMode = authMode === 'signin' ? 'signup' : 'signin'
        render()
    })

    render()
}
