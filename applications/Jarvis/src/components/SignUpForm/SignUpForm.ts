import template from './SignUpForm.html?raw'
import './SignUpForm.css'
import { supabase } from '../../lib/supabaseClient'
import { showChatView } from '../../services/viewManager'
import { createButton } from '../Button/Button'
import google from '../../assets/google.svg'

export function mountSignUpForm(container: HTMLElement, onSwitchToSignIn?: () => void) {
    container.innerHTML = template

    const usernameInput = container.querySelector('[data-username]') as HTMLInputElement

    const emailInput = container.querySelector('[data-email]') as HTMLInputElement

    const passwordInput = container.querySelector('[data-password]') as HTMLInputElement

    const confirmPasswordInput = container.querySelector('[data-confirm-password]') as HTMLInputElement

    const signupBtn = container.querySelector('[data-signup-btn]') as HTMLButtonElement

    const googleContainer = container.querySelector('[data-google-btn]') as HTMLElement

    const errorBox = container.querySelector('[data-error]') as HTMLDivElement

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
