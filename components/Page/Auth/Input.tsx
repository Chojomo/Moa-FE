type InputProps = {
  label: string
  type: string
  placeholder: string
  value: string
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input(props: InputProps) {
  const { label, type, placeholder, value, changeHandler } = props

  return (
    <div className="max-w-[350px] w-[80%] md:w-[50%] flex-center rounded-full border border-border focus:border-accent shadow-sm hover:shadow-md overflow-hidden text-[14px] px-[10px] gap-[10px] mb-[40px]">
      <label
        htmlFor={type}
        className="inline-block text-heading-text font-bold pl-[30px] py-[18px]"
      >
        {label}
      </label>
      <input
        id={type}
        type={type}
        placeholder={placeholder}
        className="inline-block focus:outline-none pl-[20px] py-[18px] flex-1 bg-transparent"
        value={value}
        onChange={changeHandler}
      />
    </div>
  )
}
