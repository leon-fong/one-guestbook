import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Messages from '../components/Messages'
import Nav from '../components/Nav'
import { signIn, useSession, signOut } from 'next-auth/react'
import { useRef } from 'react'
import { useSWRConfig } from 'swr'

export default function Home() {
  const { data: session } = useSession()
  const { mutate } = useSWRConfig()
  const inputEl = useRef(null)

  const submit = async (e: any) => {
    e.preventDefault()
    if (inputEl.current.value.length > 150) return
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
    mutate('/api/guestbook')
  }

  return (
    <div>
      <Head>
        <title>One Guestbook</title>
        <meta name="description" content="one guestbook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav></Nav>
      <main className={styles.main}>
        {session?.user && <h2 className="my-4 text-2xl sm:text-3xl font-bold py-3">{`Welcome Back , ${session.user.name} !`}</h2>}

        {/* <button className="flex w-full items-center justify-center rounded-xl  pl-4 pr-3  transition focus:outline-none focus:ring sm:mt-0 sm:w-auto" onClick={() => signOut()}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
              <path d="M7 12h14l-3-3m0 6l3-3" />
            </g>
          </svg>
        </button> */}
        <div className="pb-4  mx-auto w-full max-w-2xl ">
          {!session && (
            <div className="-mt-20 px-5">
              <div className="mb-6 flex flex-col justify-start flex-shrink-0 transform-none w-full  ">
                <p className=" tracking-wider text-6xl sm:text-8xl font-bold">Let's write a message for the visitors.</p>
              </div>
              <a
                href="/api/auth/callback"
                className="mt-4 font-sans font-bold inline-flex  items-center justify-start rounded-xl bg-[#1f1f1f] px-5 py-3 text-white transition focus:outline-none focus:ring sm:mt-0 sm:w-auto"
                onClick={(e) => {
                  e.preventDefault()
                  signIn('github')
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" className="mr-2">
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                  />
                </svg>
                Sign in with GitHub
              </a>
            </div>
          )}
          {session?.user && (
            <div className="py-2">
              <form className="sm:flex sm:gap-4 font-sans" onSubmit={submit}>
                <div className="sm:flex-1">
                  <input
                    ref={inputEl}
                    aria-label="Your message"
                    placeholder="Your message..."
                    required
                    className="w-full rounded-md bg-transparent border border-gray-200 dark:border-gray-800 px-4 py-3 shadow-sm hover:border-gray-200 hover:ring-1  text-gray-700 dark:text-white  transition  focus:outline-none focus:ring focus:[#0969da]"
                  />
                </div>

                <button type="submit" className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#1d9bf0] px-5 py-3 text-white transition focus:outline-none focus:ring sm:mt-0 sm:w-auto">
                  <span className="font-bold mr-1"> Send </span>
                  <svg width="20" height="20" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M27.71 4.29a1 1 0 0 0-1.05-.23l-22 8a1 1 0 0 0 0 1.87l8.59 3.43L19.59 11L21 12.41l-6.37 6.37l3.44 8.59A1 1 0 0 0 19 28a1 1 0 0 0 .92-.66l8-22a1 1 0 0 0-.21-1.05Z" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
        {session?.user && <Messages />}
      </main>

      <footer className={styles.footer}>Powered by Cloudflare</footer>
    </div>
  )
}
