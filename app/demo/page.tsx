'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { Editor as ToastEditor } from '@toast-ui/react-editor'

const Editor = dynamic(() => import('../../components/Editor/index'), {
  ssr: false,
})

export default function Demo() {
  const ref = useRef<ToastEditor | null>(null)

  return (
    <div className="w-[100vw] h-[100vh]">
      <form className="w-[100%] h-[100%]">
        <Editor content="" editorRef={ref} />
      </form>
    </div>
  )
}
