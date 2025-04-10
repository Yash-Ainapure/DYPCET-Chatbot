import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const runtime = 'edge'

export default function IndexPage() {
  const id = nanoid()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
      </main>
      <Footer />
    </div>
  )
  // return <Chat id={id} />
}
