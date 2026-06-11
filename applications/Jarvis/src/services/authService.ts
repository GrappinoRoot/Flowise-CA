import { supabase } from '../lib/supabaseClient'

export async function getCurrentSession() {
    const { data } = await supabase.auth.getSession()
    return data.session
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Errore durante il logout:', error)
}
