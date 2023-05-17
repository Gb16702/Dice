import SecondSlide from "@/src/components/Pages/home/SecondSlide"
import Hero from "@/src/components/Pages/home/Hero"
import { useSession } from "next-auth/react"


export default async function Home() {


return  <>
            <Hero />
            <SecondSlide />
          </>
}
