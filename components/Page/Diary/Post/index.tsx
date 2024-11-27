'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useInitDiary, useAutoSaveDiary, usePostDiary } from '@/hooks/editor'
import { getDiaryDetail } from '@/lib/api/diary'

import TitleInput from '@/components/Page/Diary/Post/TitleInput'
import ActionBar from '@/components/Page/Diary/Post/ActionBar'
import { PreviwMode } from '@/types'
import PublishModal from '@/components/Page/Diary/Post/Editor/Modal/PublishModal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PostEditor from './Editor'

export default function Post({ diaryId }: { diaryId?: string }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [preview, setPriview] = useState<PreviwMode>(window.innerWidth > 1000 ? 'live' : 'edit')
  const isInitialized = useRef<boolean>(false)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [isPublic, setIsPublic] = useState<boolean>(true)

  const { mutate: initDiary } = useInitDiary()
  const { mutateAsync: postDiary } = usePostDiary()
  const { mutate: autoSaveDiary } = useAutoSaveDiary()

  const router = useRouter()

  // ? diaryId 있으면 수정 모드
  const isEditMode = diaryId

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
    if (!isInitialized.current && !isEditMode) {
      initDiary()
      isInitialized.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveDiary = () => {
    autoSaveDiary({
      diaryTitle: title,
      diaryContents: content,
      isDiaryPublic: false,
    })
  }

  useEffect(() => {
    if (isEditMode) {
      const getPopst = async () => {
        const { data } = await getDiaryDetail({ diaryId })
        console.log(data)
        const { diaryTitle, diaryContents, isDiaryPublic, diaryThumbnail } = data

        setTitle(diaryTitle)
        setContent(diaryContents)
        setThumbnail(diaryThumbnail)
        setIsPublic(isDiaryPublic)
      }

      getPopst()
    }
  }, [diaryId, isEditMode])

  //! 임시 저장
  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   saveDiary()
    // }, 100000)
    // return () => clearInterval(intervalId)
    // saveDiary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error('제목을 입력하세요!')
      return
    }

    if (!content.trim()) {
      toast.error('내용을 입력하세요!')
      return
    }

    try {
      if (!isEditMode) {
        await postDiary({
          diaryTitle: title,
          diaryContents: content,
          diaryThumbnail: thumbnail,
          isDiaryPublic: isPublic,
        })
      }

      setTitle('')
      setContent('')
      router.push(isEditMode ? `/diary/${diaryId}` : '/diary')
    } catch (error) {
      console.error('게시물 등록 중 오류:', error)
      toast.error('게시물 등록 실패')
    }
  }
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <form className="w-[100vw] h-[100vh] flex flex-col">
        <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
        <PostEditor value={content} onChange={(v) => setContent(v || '')} preview={preview} />
        <ActionBar handleSave={saveDiary} handleOpenModal={() => setIsModalOpen(true)} />
        <PublishModal
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          handleSubmit={handleSubmit}
        />
      </form>
    </div>
  )
}
