'use client'

import { useRef, useState, useEffect } from 'react'

import dynamic from 'next/dynamic'
import { Editor as ToastEditor } from '@toast-ui/react-editor'
import { PreviwMode } from '@/types'

const Editor = dynamic(() => import('../../components/Editor/index'), {
  ssr: false,
})

export default function Demo() {
  const ref = useRef<ToastEditor | null>(null)
  const [preview, setPriview] = useState<PreviwMode>('vertical')

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
        <Editor content="" editorRef={ref} preview={preview} />
      </form>
    </div>
  )
}
