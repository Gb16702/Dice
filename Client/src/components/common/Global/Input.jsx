import { forwardRef } from "react";

const Input = forwardRef(({type, variant, ...props}, ref) => {
    const defaultType = "text";
    return  <input type={type ?? defaultType} ref={ref} className={variant === "error" ? "bg-gray-100 border border-red-400 w-full h-[50px]  gap-4 flex items-center text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-[5px] font-normal placeholder-red-400 text-red-400" : variant === "loginForm" ? "bg-white border border-[#dbdcde] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-[5px] font-normal text-black focus:border-vtertiary focus:text-vtertiary transition duration-200" : null} {...props} />
})

Input.displayName = "Input";

export default Input;