// type InputProps = {
//   value: string
//   changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
// }

export default function Input() {
  return (
    <>
      <div className="max-w-[350px] w-[80%] md:w-[50%] flex-center rounded-full border border-border focus:border-accent shadow-sm hover:shadow-md overflow-hidden text-[14px] px-[10px] gap-[10px] mb-[40px]">
        <label
          htmlFor="email"
          className="inline-block text-heading-text font-bold pl-[30px] py-[18px]"
        >
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          className="inline-block focus:outline-none pl-[20px] py-[18px] flex-1 bg-transparent"
        />
      </div>
      <div className="max-w-[350px] w-[80%] md:w-[50%] flex-center rounded-full border border-border focus:border-accent shadow-sm hover:shadow-md overflow-hidden text-[14px] px-[10px] gap-[10px]">
        <label
          htmlFor="passward"
          className="inline-block text-heading-text font-bold pl-[30px] py-[18px]"
        >
          비밀번호
        </label>
        <input
          id="passward"
          type="passward"
          placeholder="비밀번호를 입력해 주세요"
          className="inline-block focus:outline-none pl-[20px] py-[18px] flex-1 bg-transparent"
        />
      </div>
    </>
  )
}
