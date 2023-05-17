const Input = ({type, ...props}) => {

    const defaultType = "text";

    return  <input type={type ?? defaultType} {...props} />
}

export default Input;