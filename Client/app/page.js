import Glass from "@/components/Globals/Icons/HeroIcons/Glass"
import Button from "../components/Globals/Button"
import Squares from "@/components/Globals/Squares"

export default function Home() {
  return (
    <>
      <section className="flex items-center justify-center  h-[100vh]">
        <div className="w-[70%] flex items-center justify-center flex-col">
          <h1 className="text-[52px] text-center text-[#E8E8E8] relative z-30 font-bold">Découvrez des <span className="relative whitespace-nowrap"><span className="relative bg-gradient-to-r from-[#532ece] to-[#9e87ec] text-transparent bg-clip-text">aventures palpitantes</span></span> <br/>Défiez vos amis dans un univers sans limites !</h1>
          <p className="text-xl pt-7 text-zinc-200/50 relative text-[20px] text-center leading-8 z-10">Dice offre une sélection variée activités en ligne. Jouez dès maintenant avec vos amis !</p>
          <div className="HeroBottom flex flex-row space-x-5 mt-[60px] relative">
            <Button className = "bg-[#603AD9] rounded-[8px] w-[180px] h-[45px] font-medium text-white z-10 transition duration-300 hover:bg-[#6F3FD9]" text="Découvrir" />
            <Button className="border border-[#603AD9] flex text-left space-x-4 items-center flex-row placeholder-white text-white font font-medium w-[270px] h-[45px] rounded-[8px] px-6 shadowCustom z-10 bg-[#1E1E20] transition duration-300 hover:shadow-[0_0_40px]  hover:shadow-[#12121a] animate-pulse" text="">
              <Glass />
              <span className="flex-auto">Rechercher... </span>
              <span className="font-normal text-sm px-2 rounded border border-zinc-700/60">ALT S</span>
            </Button>
          </div>
        <Squares />
        </div>
      </section>
      <section className="h-[100vh] relative overflow-hidden bg-[#121212]">
        <div className="w-[70%] h-[100%] flex items-center justify-center flex-col"></div>
      </section>
    </>
  )
}
