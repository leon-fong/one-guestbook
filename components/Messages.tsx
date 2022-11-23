import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import Image from 'next/image'

type Messages = {
  _id: string
  email: string
  name: string
  message: string
  timestamp: string
  image: string
}

export default function Messages() {
  const { data: messages } = useSWR<Messages[]>('/api/guestbook', fetcher)
  return (
    <section>
      {messages
        ? messages.map((message) => {
            return (
              <div className="mx-auto max-w-5xl px-4 py-2" key={message._id}>
                <section className="rounded-lg bg-gray-100 p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
                    {message.image && <Image src={message.image} width="80" height="80" className="aspect-square w-20 rounded-full object-cover" alt={message.name}></Image>}
                    <blockquote className="sm:col-span-2">
                      <p className="text-xl font-medium sm:text-2xl">{message.message}</p>

                      <cite className="mt-8 inline-flex items-center not-italic">
                        <span className="hidden h-px w-6 bg-gray-400 sm:inline-block"></span>
                        <p className="text-sm uppercase text-gray-500 sm:ml-3">
                          <strong>{message.name}</strong> , <span>{`${new Date(message.timestamp).toLocaleString('en')}`}</span> .
                        </p>
                      </cite>
                    </blockquote>
                  </div>
                </section>
              </div>
            )
          })
        : null}
    </section>
  )
}
