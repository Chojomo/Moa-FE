'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { useInitDiary, useAutoSaveDiary } from '@/hooks/editor'

import TitleInput from '@/components/Page/Diary/Post/TitleInput'
import ActionBar from '@/components/Page/Diary/Post/ActionBar'
import { PreviwMode } from '@/types'
import PublishModal from '@/components/Page/Diary/Post/Editor/Modal/PublishModal'

const Editor = dynamic(() => import('../../../components/Page/Diary/Post/Editor/index'), {
  ssr: false,
})

export default function Post() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [preview, setPriview] = useState<PreviwMode>(window.innerWidth > 1000 ? 'live' : 'edit')
  const isInitialized = useRef<boolean>(false)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isPublic, setIsPublic] = useState<boolean>(true)

  const { mutate: initDiary } = useInitDiary()
  const { mutate: autoSaveDiary } = useAutoSaveDiary()

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

  const saveDiary = () => {
    autoSaveDiary({
      diaryTitle: title,
      diaryContentse: content,
      isDiaryPublic: false,
    })
  }

  useEffect(() => {
    console.log(content)
  }, [content])

  //! 임시 저장
  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   saveDiary()
    // }, 100000)
    // return () => clearInterval(intervalId)
    saveDiary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <form className="w-[100vw] h-[100vh] flex flex-col">
        <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
        <Editor value={content} onChange={(v) => setContent(v || '')} preview={preview} />
        <ActionBar handleSave={saveDiary} handleOpenModal={() => setIsModalOpen(true)} />
        <PublishModal
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
        />
      </form>
    </div>
  )
}
