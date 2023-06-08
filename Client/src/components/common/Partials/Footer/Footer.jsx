"use client";

import React from "react"
import Newsletter from './Bottom/Newsletter/Newsletter'
import FooterNavigation from './Top/FooterNavigation'
import { SpecificPathname } from '@/src/lib/SpecificPathname'

const Footer = () => {

    const isSpecificPathname = SpecificPathname();

    return <footer className={`h-[20vh] bg-[#1E1E20] flex justify-center border-t border-zinc-700 ${isSpecificPathname ? "hidden" : null}`}>
            <div className=' max-w-[60%] w-[100%]'>
                <FooterNavigation />
                <div className='border-zinc-700/90 py-6 flex justify-between flex-row items-center border-t'>
                    <h3 className='text-zinc-400 text-sm'>© Copyright 2023. Tous droits réservés.</h3>
                    <Newsletter />
                </div>
            </div>
           </footer>
}

export default Footer