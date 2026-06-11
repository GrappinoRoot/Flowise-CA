import template from './SignUpForm.html?raw'
import './SignUpForm.css'
import { supabase } from '../../lib/supabaseClient'
import { showChatView } from '../../services/viewManager'

export function mountSignUpForm(container: HTMLElement) {
    container.innerHTML = template

    const usernameInput = container.querySelector('[data-username]') as HTMLInputElement

    const emailInput = container.querySelector('[data-email]') as HTMLInputElement

    const passwordInput = container.querySelector('[data-password]') as HTMLInputElement

    const confirmPasswordInput = container.querySelector('[data-confirm-password]') as HTMLInputElement

    const signupBtn = container.querySelector('[data-signup-btn]') as HTMLButtonElement

    const googleBtn = container.querySelector('[data-google-btn]') as HTMLButtonElement

    signupBtn.addEventListener('click', async () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            console.error('Passwords do not match')
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
            console.error(error)
            return
        }

        showChatView()
    })

    googleBtn.addEventListener('click', async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        })

        if (error) {
            console.error(error)
            return
        }

        showChatView()
    })
}
