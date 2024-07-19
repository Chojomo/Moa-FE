interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  children?: React.ReactNode
}

export default function Button({
  type = 'button',
  ariaLabel,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} aria-label={ariaLabel} className={className} {...rest}>
      {children}
    </button>
  )
}
