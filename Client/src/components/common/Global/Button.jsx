const Button = ({ text, children, ...props }) => (
    <button {...props}>
        {text}
        {children}
    </button>
)

export default Button;