import { envPublic } from '@/envPublic'
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    envPublic.NEXT_PUBLIC_SUPABASE_URL!,
    envPublic.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
