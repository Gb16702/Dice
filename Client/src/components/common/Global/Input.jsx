import { forwardRef } from "react";

const Input = forwardRef(({type, ...props}, ref) => {
    const defaultType = "text";
    return  <input type={type ?? defaultType} ref = {ref} {...props} />
})

export default Input;