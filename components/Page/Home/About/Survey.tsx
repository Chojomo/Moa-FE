'use client'

import { useState, useCallback, FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { survey } from '@/lib/api/survey'
import Button from '@/components/Button'

export default function Survey() {
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target
        setter(value)
      },
    []
  )

  const { mutate } = useMutation({
    mutationFn: (form: { name: string; message: string }) => survey(form.name, form.message),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('폼 등록 실패:', error.message)
      } else {
        console.error('폼 등록 실패:', error)
      }
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim()) {
      alert('이름을 입력해 주세요.')
      return
    }

    if (!message.trim()) {
      alert('메시지를 입력해 주세요.')
      return
    }

    mutate({ name, message })
  }

  return (
    <form className="w-[100%] flex flex-col items-start gap-[30px]" onSubmit={handleSubmit}>
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
          value={name}
          onChange={handleChange(setName)}
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
          value={message}
          onChange={handleChange(setMessage)}
        />
      </div>
    </form>
  )
}
