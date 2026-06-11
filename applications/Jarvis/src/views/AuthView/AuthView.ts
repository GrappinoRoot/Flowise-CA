import { supabase } from '../../lib/supabaseClient'
import template from './AuthView.html?raw'
import './AuthView.css'
import { showChatView } from '../../services/viewManager'

export async function mountAuthView(container: HTMLElement) {
    container.innerHTML = template

    const emailInput = container.querySelector('#email') as HTMLInputElement
    const passwordInput = container.querySelector('#password') as HTMLInputElement

    const loginBtn = container.querySelector('#loginBtn')!
    const signupBtn = container.querySelector('#signupBtn')!
    const googleBtn = container.querySelector('#googleBtn')!

    loginBtn.addEventListener('click', async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: emailInput.value,
            password: passwordInput.value
        })

        if (error) {
            console.error(error)
            return
        }

        showChatView()
    })

    signupBtn.addEventListener('click', async () => {
        const { error } = await supabase.auth.signUp({
            email: emailInput.value,
            password: passwordInput.value
        })

        if (error) console.error(error)
    })

    googleBtn.addEventListener('click', async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        })

        if (error) console.error(error)
    })
}
