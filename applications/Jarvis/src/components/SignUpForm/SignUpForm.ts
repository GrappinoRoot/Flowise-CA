import template from './SignUpForm.html?raw'
import './SignUpForm.css'
import { supabase } from '../../lib/supabaseClient'
import { showChatView } from '../../services/viewManager'
import { Button } from '../Button/Button'
import google from '../../assets/google.svg'
import { getElement } from '../../utils/getElement'

export function mountSignUpForm(container: HTMLElement, onSwitchToSignIn?: () => void) {
    container.innerHTML = template

    const usernameInput = getElement<HTMLInputElement>(container, '[data-username]')
    const emailInput = getElement<HTMLInputElement>(container, '[data-email]')
    const passwordInput = getElement<HTMLInputElement>(container, '[data-password]')
    const confirmPasswordInput = getElement<HTMLInputElement>(container, '[data-confirm-password]')
    const signupBtn = getElement<HTMLButtonElement>(container, '[data-signup-btn]')
    const googleContainer = getElement<HTMLElement>(container, '[data-google-btn]')
    const errorBox = getElement<HTMLDivElement>(container, '[data-error]')

    function showError(message: string) {
        errorBox.textContent = message
    }

    signupBtn.addEventListener('click', async () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError('Le password non corrispondono')
            return
        }

        if (!emailInput.value || !passwordInput.value) {
            showError('Inserisci email e password')
            return
        }

        const { error } = await supabase.auth.signUp({
            email: emailInput.value,
            password: passwordInput.value,
            options: {
                data: {
                    username: usernameInput.value
                }
            }
        })

        if (error) {
            // Gestione utente già registrato
            if (error.message.toLowerCase().includes('already registered') || error.code === 'user_already_exists') {
                showError('Account già esistente. Reindirizzamento al login...')
                setTimeout(() => {
                    if (onSwitchToSignIn) onSwitchToSignIn()
                }, 2000)
            } else {
                showError('Errore durante la registrazione: ' + error.message)
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
