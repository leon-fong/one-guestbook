import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Online Guestbook</title>
        <meta name="description" content="online guestbook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        Online Guestbook
        </h1>
      </main>

      <footer className={styles.footer}>
          Powered by{' '} Cloudflare
      </footer>
    </div>
  )
}
