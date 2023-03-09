import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import localFont from '@next/font/local'
const myFont = localFont({ src: '../styles/fonts/SmileySans.woff2' })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        async defer data-website-id="637b79c0-284a-4d38-b05c-dcf8836266da"
        src={`https://stats.leonfong.me/app.js`}
      />
      <SessionProvider session={session}>
        <main className={myFont.className}>
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </main>
      </SessionProvider>
    </>
  )
}
