import Button from "../components/Globals/Button"

export default function Home() {
  return (
    <section className="flex items-center justify-center">
      <div className="w-[70%] h-[900px] flex items-center justify-center flex-col">
        <h3 className="text-xl text-[#E8E8E8]">Nous sommes fiers de vous présenter</h3>
        <h1 className='text-[75px] font-bold text-[#E8E8E8]'>Random Games</h1>
        <h2 className="text-[52px] text-[#E8E8E8]">Des jeux de qualité supérieure.</h2>
        <p className="text-xl pt-3 text-[#E8E8E8]">Notre plate-forme propose une sélection diverse et variée de jeux et activités en ligne, adaptée à tous les goûts.</p>
        <div className="HeroBottom block space-x-3 mt-7">
          <Button className = "bg-white rounded-[8px] w-[180px] h-[45px] font-medium" text="Découvrir" />
          <Button className="bg-[#9C5DFE] placeholder-white text-white font font-medium w-[280px] h-[45px] rounded-[8px]" text="Recherche rapide... " />
        </div>
      </div>
    </section>
  )
}
