const Newsletter = () => {
    return  <div className='flex flex-row'>
                <input type="email" placeholder='Entrez votre adresse mail' className='w-[350px] pl-4 h-11 border border-zinc-700 border-r-0 py-2 rounded-l-md bg-transparent placeholder:text-sm placeholder:text-zinc-400 text-zinc-400 outline-none' />
                <button type = "submit" className='text-sm bg-[#603AD9]/[.12] text-[#7e60e1] h-11 py-2 border border-[#7e60e1] px-4 rounded-r-md'>Rejoindre</button>
            </div>
}

export default Newsletter;