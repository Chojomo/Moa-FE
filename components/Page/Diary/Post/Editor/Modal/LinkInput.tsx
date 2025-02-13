type LinkInputProps = {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export default function LinkInput({ value, handleChange, placeholder }: LinkInputProps) {
  return (
    <input
      className="w-[200px] bg-transparent text-body-text  placeholder:text-[13px] placeholder:text-nonActive-text border-b border-solid p-2 focus:outline-none focus:ring-0"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  )
}
