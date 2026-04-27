import type { AppProps } from 'next/app'
import { supabase } from '../lib/supabaseClient'

export default function App({ Component, pageProps }: AppProps) {
  // Note: SessionContextProvider is unavailable in the installed auth-helpers version.
  // The app runs without explicit provider; you may add it later with a newer package.
  return <Component {...pageProps} />
}
