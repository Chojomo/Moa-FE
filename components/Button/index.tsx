interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({ type = 'button', className, children, ...rest }: ButtonProps) {
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  )
}
