import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
type Messages = {
  _id: string
  email: string
  name: string
  message: string
  date: string
  image: string
}

export default function Messages() {
  const { data: messages } = useSWR<Messages[]>('/api/guestbook', fetcher)
  return (
    <section>
      {messages
        ? messages.map((message) => {
            return (
              <div className="mx-auto max-w-2xl  py-2" key={message._id}>
                <section className="rounded-lg bg-gray-100 p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">{message.image && <Image src={message.image} width={40} height={40} className=" w-full aspect-square rounded-full object-cover" alt={message.name}></Image>}</div>
                    <blockquote className="flex-auto">
                      <p className="text-sm text-gray-500 font-sans">
                        <strong>{message.name}</strong> · <span>{`${dayjs(message.date).fromNow()}`}</span>
                      </p>
                      <p className="text-sm font-normal break-words font-sans sm:text-base mt-1">{message.message}</p>
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
