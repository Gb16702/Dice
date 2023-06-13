import '../../globals.css'
import Header from "@/src/components/common/Partials/Header/Header"

export const metadata = {
  title: 'Dice - Authentification',
  description: 'Pages d\'authentification de Dice',
  ogTitle: 'Dice - Authentification',
  ogDescription: 'Pages d\'authentification de Dice',
  // ogImage: '/images/og-image.jpg',
}

export default function RootLayout({ children }) {
  return (
    <>
        <Header template="auth" />
        <main className='w-[100%] h-[100%]'>
            {children}
        </main>
    </>
  )
}
