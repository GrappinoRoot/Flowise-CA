import template from './SignInForm.html?raw'
import './SignInForm.css'
import { supabase } from '../../lib/supabaseClient'
import { showChatView } from '../../services/viewManager'
import { createButton } from '../Button/Button'
import google from '../../assets/google.svg'

export function mountSignInForm(container: HTMLElement) {
    container.innerHTML = template

    const emailInput = container.querySelector('[data-email]') as HTMLInputElement
    const passwordInput = container.querySelector('[data-password]') as HTMLInputElement

    const loginBtn = container.querySelector('[data-login-btn]') as HTMLButtonElement
    const googleContainer = container.querySelector('[data-google-btn]') as HTMLElement

    const errorBox = container.querySelector('[data-error]') as HTMLDivElement

    function showError(message: string) {
        errorBox.textContent = message
    }

    function clearError() {
        errorBox.textContent = ''
    }

    loginBtn.addEventListener('click', async () => {
        clearError()

        const { error } = await supabase.auth.signInWithPassword({
            email: emailInput.value,
            password: passwordInput.value
        })

        if (error) {
            if (error.code === 'invalid_credentials') {
                showError('Email o password non corretti')
            } else {
                showError('Errore durante il login, riprova')
            }
            return
        }

        showChatView()
    })

    const googleBtn = createButton({
        label: 'Continue with Google',
        icon: google,
        variant: 'secondary',
        onClick: async () => {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            })

            if (error) {
                showError('Errore login Google')
            }
        }
    })

    if (googleContainer) {
        googleContainer.replaceWith(googleBtn)
    }
}
