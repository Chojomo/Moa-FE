'use client'

import { useState, useCallback, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '@/lib/api/diary'
import { PreviwMode } from '@/types'

import MDEditor, { ICommand, TextAreaTextApi } from '@uiw/react-md-editor'
import { commands } from '@/helper/commands'
import { defaultSchema } from 'hast-util-sanitize'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { clipboardToMarkdown } from '@/helper/clipboardToMarkdown'

import { LinkModal } from './Modal'

type PostEditorProps = {
  value: string
  onChange: (value?: string) => void
  preview: PreviwMode
}

export default function PostEditor({ value, onChange, preview }: PostEditorProps) {
  const [linkValue, setLinkValue] = useState<string>('')
  const [linkTextValue, setLinkTextValue] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [imgApi, setImgApi] = useState<TextAreaTextApi | null>(null)
  const [linkApi, setLinkApi] = useState<TextAreaTextApi | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)

  const { mutate: uploadImageMutate } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const url = data.data.imageUrl
      const markdownImage = `![Image](${url})<!--rehype:style=width: 500px; height: auto;-->`

      if (imgApi) {
        imgApi.replaceSelection(markdownImage)
      } else {
        console.log(markdownImage)
        onChange((value || '') + markdownImage)
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('이미지 업로드 실패:', error.message)
      } else {
        console.error('이미지 업로드 실패:', error)
      }
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadImageMutate(file)
    }
  }

  // ! 링크 커맨드
  const linkCommand: ICommand = {
    ...commands.link,
    execute: (_, api) => {
      setLinkApi(api)
      setIsModalOpen(true)
    },
  }

  // ! 링크 핸들러
  const handleInsertLink = () => {
    const markdownLink = `[${linkTextValue}](${linkValue})`
    linkApi?.replaceSelection(markdownLink)
    setIsModalOpen(false)
    setLinkTextValue('')
    setLinkValue('')
  }

  // ! 이미지 업로드 커맨드
  const imageUploadCommand: ICommand = {
    ...commands.image,
    execute: (_, api) => {
      setImgApi(api)
      fileInputRef.current?.click()
    },
  }

  // ! 코드 커맨드
  const codeCommand: ICommand = {
    ...commands.code,
    execute: (state, api) => {
      const modifyText = `\`\`\`\n${state.selectedText || ''}\n\`\`\``
      api.replaceSelection(modifyText)
    },
  }

  // ? 이미지 스타일 속성 허용하려고..
  const customSanitize = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      '*': [...(defaultSchema.attributes?.['*'] || []), 'style'],
    },
    tagNames: [...(defaultSchema.tagNames || []), 'img', 'div'],
  }

  // ? 이미지 복사 붙여 넣기
  const handlePaste = async () => {
    try {
      const markdown = await clipboardToMarkdown()
      onChange((value || '') + markdown)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div ref={editorRef} className="h-[75%] flex-1">
      <MDEditor
        value={value}
        onChange={onChange}
        preview={preview}
        previewOptions={{
          rehypePlugins: [[rehypeRaw], [rehypeSanitize, customSanitize]],
        }}
        className="custom-editor"
        style={{ whiteSpace: 'pre-wrap' }}
        height="100%"
        commands={[
          commands.title1,
          commands.title2,
          commands.title3,
          commands.divider,
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.divider,
          linkCommand,
          commands.quote,
          imageUploadCommand,
          codeCommand,
          commands.divider,
          commands.unorderedListCommand,
          commands.orderedListCommand,
        ]}
        onPaste={handlePaste}
      />
      <LinkModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        textValue={linkTextValue}
        handleTextChange={useCallback((e) => setLinkTextValue(e.target.value), [])}
        linkValue={linkValue}
        handleLinkChange={useCallback((e) => setLinkValue(e.target.value), [])}
        handleAddClick={handleInsertLink}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  )
}
