import Button from '@/components/Button'

export default function Form() {
  return (
    <form className="w-[100%] flex flex-col items-start gap-[30px]">
      <div className="relative w-full flex items-center">
        <label htmlFor="name" className="sr-only">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-3/5 px-4 py-3 border-b-2 border-border rounded-md text-[14px] focus:outline-none"
          placeholder="이름"
          aria-label="이름 입력"
        />
        <Button
          type="submit"
          className="absolute right-0 text-[#fff] text-[14px] font-semibold px-3 py-2 bg-main-blue rounded-full"
        >
          보내기 💌
        </Button>
      </div>
      <div className="w-full">
        <label htmlFor="message" className="sr-only">
          소중한 의견
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full h-auto max-h-[150px] px-4 py-3 border-b-2 border-border rounded-md text-[14px] focus:outline-none"
          placeholder="소중한 의견 ✉️"
          aria-label="소중한 의견 입력"
        />
      </div>
    </form>
  )
}
