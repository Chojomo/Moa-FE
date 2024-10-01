'use client'

import { useState, useEffect, useRef } from 'react'

import dynamic from 'next/dynamic'
import { PreviwMode } from '@/types'
import TitleInput from '@/components/Page/Diary/Post/TitleInput'
import { useInitDiary, useAutoSaveDiary } from '@/hooks/editor'

const Editor = dynamic(() => import('../../../components/Page/Diary/Post/Editor/index'), {
  ssr: false,
})

export default function Post() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [preview, setPriview] = useState<PreviwMode>(window.innerWidth > 1000 ? 'live' : 'edit')
  const isInitialized = useRef<boolean>(false)

  const { mutate: initDiary } = useInitDiary()
  const { mutate: autoSaveDiary } = useAutoSaveDiary({
    title,
    content,
    thumbnail: '',
    isDiaryPublic: false,
  })

  const handleResize = () => {
    setPriview(window.innerWidth > 1000 ? 'live' : 'edit')
    console.log(window.innerWidth > 1000 ? 'live' : 'edit')
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  //! 다이어리 초기화
  useEffect(() => {
    if (!isInitialized.current) {
      initDiary()
      isInitialized.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(content)
  }, [content])

  //! 임시 저장
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     autoSaveDiary()
  //   }, 10000)

  //   return () => clearInterval(intervalId)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [autoSaveDiary])

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <form className="w-[100vw] h-[100vh] flex flex-col">
        <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
        <Editor value={content} onChange={(v) => setContent(v || '')} preview={preview} />
      </form>
    </div>
  )
}
