import { supabase } from '../lib/supabaseClient'

export async function getCurrentSession() {
    const { data } = await supabase.auth.getSession()
    return data.session
}
