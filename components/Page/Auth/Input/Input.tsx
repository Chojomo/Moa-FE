type InputProps = {
  id: string
  type: string
  placeholder: string
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

export default function Input(props: InputProps) {
  const { id, type, placeholder, value, handleChange, children } = props

  return (
    <div className="relative max-w-[380px] w-[80%] md:w-[50%] rounded flex-center border border-[#7f7f7f] dark:border-[#c7c7c7] focus:border-accent shadow-sm hover:shadow-md overflow-hidden text-[1rem] px-[10px]">
      <input
        id={id}
        type={type}
        aria-label={`${type} input`}
        placeholder={placeholder}
        className="input-reset w-full rounded px-[10px] py-[18px] flex-1 placeholder:font-light placeholder:text-[0.8rem] autofill:text-heading-text autofill:shadow-none"
        value={value}
        onChange={handleChange}
      />
      {children}
    </div>
  )
}
