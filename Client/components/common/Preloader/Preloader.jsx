"use client"

import {useEffect, useState} from "react"
import styles from "@/styles/preloader.module.css"

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300)
        return () => clearTimeout(timer)
    }, [])

    return isLoading && (
        <div className="fixed w-[100%] min-h-[100vh] h-[100%] z-[999] bg-[#1E1E20]">
            <div className={`${styles.preloaderContainer} absolute w-[100px] h-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[5px] border-[#232323]/[.45] rounded-full`}>
                <div className="preloadContainerIcons w-[80px] text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    )
 }

export default Preloader