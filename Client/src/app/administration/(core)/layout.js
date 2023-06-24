import Sidebar from '@/src/components/common/Global/Admin/Sidebar'
import '../../globals.css'
import Header from '@/src/components/common/Global/Admin/Header'
import { decodeSession } from "@/src/lib/decodeSession"
import Pathname from '@/src/components/common/Global/Admin/Pathname'

export const metadata = {
  title: 'Next.js Starter',
  description: 'Generated by create next app',
  ogTitle: 'Next.js Starter',
  ogDescription: 'Generated by create next app',
  // ogImage: '/images/og-image.jpg',
}

export default async function RootLayout({ children }) {

  const session = await decodeSession()

  return (
    <>
        <div className='relative h-[100vh] overflow-hidden'>
            <Header session={session} />
            <main className='flex flex-row w-full h-full'>
            <Sidebar />
            <section className='w-full h-full bg-zinc-950/[.95] border-t border-zinc-800 px-[40px]'>
              <Pathname />
              {children}
            </section>
            </main>
        </div>
    </>
  )
}
