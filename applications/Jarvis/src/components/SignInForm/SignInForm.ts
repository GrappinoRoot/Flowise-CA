import template from './SignInForm.html?raw'
import './SignInForm.css'
import { supabase } from '../../lib/supabaseClient'
import { showChatView } from '../../services/viewManager'
import { Button } from '../Button/Button'
import google from '../../assets/google.svg'
import { getElement } from '../../utils/getElement'

export function mountSignInForm(container: HTMLElement) {
    container.innerHTML = template

    const emailInput = getElement<HTMLInputElement>(container, '[data-email]')
    const passwordInput = getElement<HTMLInputElement>(container, '[data-password]')
    const loginBtn = getElement<HTMLButtonElement>(container, '[data-login-btn]')
    const googleContainer = getElement<HTMLElement>(container, '[data-google-btn]')
    const errorBox = getElement<HTMLDivElement>(container, '[data-error]')

    // const'[data-error]') as HTMLDivElement

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

    const googleBtn = new Button({
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
    }).render()

    if (googleContainer) {
        googleContainer.replaceWith(googleBtn)
    }
}
