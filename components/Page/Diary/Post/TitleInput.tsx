type TitleInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <input
      type="text"
      placeholder="제목을 입력하세요"
      value={value}
      onChange={onChange}
      className="w-[100%] h-[15%] text-[28px] px-[38px] pt-[60px] pb-[30px] rounded focus:outline-none focus:ring-0"
    />
  )
}
