'use client'

import { useRef, useState, useEffect } from 'react'

import dynamic from 'next/dynamic'
// import { Editor as ToastEditor } from '@toast-ui/react-editor'
import { PreviwMode } from '@/types'

const Editor = dynamic(() => import('../../../components/Editor/index'), {
  ssr: false,
})

export default function Post() {
  // const ref = useRef<ToastEditor | null>(null)
  const [title, setTitle] = useState<string>('')
  const [preview, setPriview] = useState<PreviwMode>(window.innerWidth > 1000 ? 'vertical' : 'tab')

  const handleResize = () => {
    setPriview(window.innerWidth > 1000 ? 'vertical' : 'tab')
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="w-[100vw] h-[100vh]">
      <form className="w-[100%] h-[100%]">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[100%] text-[28px] px-[38px] pt-[60px] pb-[30px] rounded focus:outline-none focus:ring-0"
        />
        <Editor />
      </form>
    </div>
  )
}
