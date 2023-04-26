import Preloader from "@/components/common/Preloader/Preloader"
import Glass from "@/components/common/Global/Icons/HeroIcons/Glass"
import Button from "@/components/common/Global/Button"
import Squares from "@/components/common/Global/Squares"
import Title from "@/components/common/Partials/Title"
import style from "@/styles/heroBackground.module.css"
import Header from "@/components/common/Partials/Header/Header"

const Hero = () => {
    return <>
        {/* <Preloader /> */}
        <section className={`${style.heroSection} flex items-center justify-center  h-[100vh] relative overflow-hidden`}>
            <div className="w-[70%] flex items-center justify-center flex-col">
                <Title />
                <div className="HeroBottom flex flex-row space-x-5 mt-[60px] relative">
                    <Button className="bg-[#603AD9] rounded-[8px] w-[180px] h-[45px] font-medium text-white z-10 transition duration-300 hover:bg-[#6F3FD9]" text="Découvrir" />
                    <Button className="border border-[#603AD9] flex text-left space-x-4 items-center flex-row placeholder-white text-white font font-medium w-[270px] h-[45px] rounded-[8px] px-6 shadow-[0_0_34px_-8px] shadow-[#603AD9] z-10 bg-[#1E1E20] transition duration-300 hover:shadow-[0_0_40px]  hover:shadow-[#12121a] animate-pulse" text="">
                        <Glass />
                        <span className="flex-auto">Rechercher... </span>
                        <span className="font-normal text-sm px-2 rounded border border-zinc-700/60">ALT S</span>
                    </Button>
                </div>
            <Squares />
            </div>
        </section>
    </>
}

export default Hero