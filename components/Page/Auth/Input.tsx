type InputProps = {
  label: string
  type: string
  placeholder: string
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

export default function Input(props: InputProps) {
  const { label, type, placeholder, value, handleChange, children } = props

  return (
    <div className="relative max-w-[380px] w-[80%] md:w-[50%] flex-center rounded-full border border-border focus:border-accent shadow-sm hover:shadow-md overflow-hidden text-[14px] px-[10px] gap-[10px] mb-[30px]">
      <label
        htmlFor={type}
        className="inline-block text-heading-text font-bold pl-[20px] py-[18px]"
      >
        {label}
      </label>
      <input
        id={type}
        type={type}
        placeholder={placeholder}
        className="inline-block focus:outline-none pl-[10px] pr-[70px] py-[18px] flex-1 bg-transparent"
        value={value}
        onChange={handleChange}
      />
      {children}
    </div>
  )
}
