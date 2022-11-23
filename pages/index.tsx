import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Messages from '../components/Messages'
import { signIn, useSession } from 'next-auth/react'
import { useRef } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const inputEl = useRef(null)

  const submit = async (e: any) => {
    e.preventDefault()
    const res = await fetch('api/guestbook', {
      body: JSON.stringify({
        message: inputEl.current.value,
        ...session.user,
      }),
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
    })

    inputEl.current.value = ''
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Online Guestbook</title>
        <meta name="description" content="online guestbook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Online Guestbook</h1>
        {!session && (
          <a
            href="/api/auth/callback"
            className="flex items-center justify-center my-4 font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
            onClick={(e) => {
              e.preventDefault()
              signIn('github')
            }}
          >
            Login
          </a>
        )}
        {session?.user && (
          <div className="mx-auto max-w-5xl px-4 py-2">
            <form className="sm:flex sm:gap-4" onSubmit={submit}>
              <div className="sm:flex-1">
                <input
                  ref={inputEl}
                  aria-label="Your message"
                  placeholder="Your message..."
                  required
                  className="w-full rounded-md border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 text-gray-700  transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                />
              </div>

              <button type="submit" className="group mt-4 flex w-full items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700 px-5 py-3 text-gray-900 dark:text-gray-100 transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto">
                <span className="text-sm font-medium"> Send </span>
              </button>
            </form>
          </div>
        )}
        <Messages />
      </main>

      <footer className={styles.footer}>Powered by Cloudflare</footer>
    </div>
  )
}
