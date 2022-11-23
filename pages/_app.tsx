import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import localFont from '@next/font/local'
const myFont = localFont({ src: '/SmileySans.woff2' })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={myFont.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
