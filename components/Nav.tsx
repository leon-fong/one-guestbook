import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function Nav() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  useEffect(() => setMounted(true), [])

  return (
    <nav className="sticky t-0 z-10 w-full h-20 border-b border-gray-100 dark:border-gray-800">
      <div className="flex h-full px-4 items-center justify-between  mx-auto max-w-5xl">
        <a href="/" className=" text-gray-800 dark:text-gray-200 inline-flex items-center">
          <svg viewBox="0 0 24 24" className="bg-gray-900 dark:bg-white w-9 h-9 text-white dark:text-gray-900 p-2 rounded-xl">
            <path
              fill="currentColor"
              d="m10.22 11.506l.111.018c-.038-.006-.075-.011-.111-.018zm4.475 8.073c.636-2.816-2.172-4.8-6.955-4.814L.713 24h9.586c.132-.025.256-.056.384-.085c2.258-1.057 3.598-2.501 4.012-4.336zM10.299 24h.203l.021-.01c-.075.003-.148.008-.224.01zM24 11.319C24 3.15 18.711-.597 8.134.077L0 11.319h7.568c3.323 0 8.457.719 8.457 6.153c0 3.622-1.909 5.798-5.727 6.528c.099-.003.194-.009.291-.013l-.011.001l-.076.012h.912l.247-.077C19.885 23.27 24 19.07 24 11.319z"
            />
          </svg>
          <span className="text-2xl font-bold ml-3">One Guestbook</span>
        </a>
        <div className="flex gap-2">
          <a href="https://github.com/leon-fong/one-guestbook" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9  flex items-center justify-center transition-all">
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
              />
            </svg>
          </a>
          <button aria-label="Toggle Dark Mode" type="button" className="w-9 h-9  flex items-center justify-center  transition-all" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
            {mounted && (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className=" text-gray-800 dark:text-gray-200">
                {resolvedTheme === 'dark' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                )}
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
