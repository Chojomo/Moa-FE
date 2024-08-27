'use client'

import { useState, useCallback } from 'react'
import { Editor } from '@tiptap/react'
import Modal from 'react-modal'
import Button from '../Button'
import { Icon } from '../Icon'

type ToolbarProps = {
  editor: Editor
}

export default function Toolbar({ editor }: ToolbarProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [linkInput, setLinkInput] = useState({ href: '', text: '' })

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const handleLinkInsert = () => {
    const { href, text } = linkInput
    if (!href || !text) return

    const { state } = editor
    const { selection } = state
    const { from, to } = selection
    const { $from } = selection

    const isTextSelected = from < to
    const nodeAtSelection = $from.node()
    let tr

    if (nodeAtSelection && nodeAtSelection.type.name !== 'codeBlock' && isTextSelected) {
      tr = state.tr.deleteSelection()
      tr = state.tr.insertText(text as string)

      const linkMarkType = state.schema.marks.link
      const linkMark = linkMarkType.create({ href })

      tr = tr.addMark(from, from + (text as string).length, linkMark)

      editor.view.dispatch(tr)
    } else if (nodeAtSelection.type.name !== 'codeBlock') {
      editor.chain().focus().setLink({ href }).insertContent(text).run()
    }

    closeModal()
  }

  const setLink = useCallback(() => {
    openModal()
  }, [])

  if (!editor) {
    return null
  }

  const headings = [
    {
      index: 1,
      ariaLabel: 'heading 1',
      handleClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      disable: !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
      iconName: 'Heading1',
      iconWidth: 20,
      iconHeight: 18,
    },
    {
      index: 2,
      ariaLabel: 'heading 2',
      handleClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      disable: !editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
      iconName: 'Heading2',
      iconWidth: 24,
      iconHeight: 18,
    },
    {
      index: 3,
      ariaLabel: 'heading 3',
      handleClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      disable: !editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
      iconName: 'Heading3',
      iconWidth: 23,
      iconHeight: 18,
    },
  ]

  const textStyles = [
    {
      index: 1,
      ariaLabel: 'Bold',
      handleClick: () => editor.chain().focus().toggleBold().run(),
      disable: !editor.can().chain().focus().toggleBold().run(),
      iconName: 'Bold',
      iconWidth: 20,
      iconHeight: 18,
    },
    {
      index: 2,
      ariaLabel: 'Italic',
      handleClick: () => editor.chain().focus().toggleItalic().run(),
      disable: !editor.can().chain().focus().toggleItalic().run(),
      iconName: 'Italic',
      iconWidth: 20,
      iconHeight: 18,
    },
    {
      index: 3,
      ariaLabel: 'Strike',
      handleClick: () => editor.chain().focus().toggleStrike().run(),
      disable: !editor.can().chain().focus().toggleStrike().run(),
      iconName: 'Strike',
      iconWidth: 18,
      iconHeight: 15,
    },
  ]

  const markdownContents = [
    {
      index: 1,
      ariaLabel: 'Quote',
      handleClick: () => editor.chain().focus().toggleBlockquote().run(),
      disable: !editor.can().chain().focus().toggleBlockquote().run(),
      iconName: 'Quote',
      iconWidth: 20,
      iconHeight: 18,
    },
    {
      index: 2,
      ariaLabel: 'Add Link',
      handleClick: setLink,
      iconName: 'Link',
      iconWidth: 20,
      iconHeight: 10,
    },
    {
      index: 3,
      ariaLabel: 'Add Image',
      handleClick: () => {},
      disable: null,
      iconName: 'Image',
      iconWidth: 18,
      iconHeight: 18,
    },
    {
      index: 4,
      ariaLabel: 'Add Code',
      handleClick: () => editor.chain().focus().toggleCode().run(),
      disable: !editor.can().chain().focus().toggleCode().run(),
      iconName: 'Code',
      iconWidth: 20,
      iconHeight: 12,
    },
  ]

  return (
    <div className="h-[70px] flex-center gap-[15px] border-b border-gray-300">
      <div className="flex-center gap-[10px]">
        {headings.map(
          ({ index, ariaLabel, handleClick, disable, iconName, iconWidth, iconHeight }) => (
            <Button
              key={index}
              type="button"
              ariaLabel={ariaLabel}
              onClick={handleClick}
              disabled={disable}
              className="p-[10px]"
            >
              <Icon name={iconName} width={iconWidth} height={iconHeight} />
            </Button>
          )
        )}
      </div>
      <div className="h-[20px] w-[1px] bg-heading-bg mx-[10px]" />
      <div className="flex-center gap-[10px]">
        {textStyles.map(
          ({ index, ariaLabel, handleClick, disable, iconName, iconWidth, iconHeight }) => (
            <Button
              key={index}
              type="button"
              ariaLabel={ariaLabel}
              onClick={handleClick}
              disabled={disable}
              className="p-[10px]"
            >
              <Icon name={iconName} width={iconWidth} height={iconHeight} />
            </Button>
          )
        )}
      </div>
      <div className="h-[20px] w-[1px] bg-heading-bg mx-[10px]" />
      <div className="flex-center gap-[10px]">
        {markdownContents.map(
          ({ index, ariaLabel, handleClick, disable, iconName, iconWidth, iconHeight }) => (
            <Button
              key={index}
              type="button"
              ariaLabel={ariaLabel}
              onClick={handleClick}
              disabled={disable || undefined}
              className="p-[10px]"
            >
              <Icon name={iconName} width={iconWidth} height={iconHeight} />
            </Button>
          )
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Link"
        className="fixed top-[50%] left-[50%] w-auto bg-nav-bg p-[15px] rounded-lg"
      >
        <h2>Add Link</h2>
        <input
          type="text"
          placeholder="Enter the URL"
          value={linkInput.href}
          onChange={(e) => setLinkInput({ ...linkInput, href: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter the text"
          value={linkInput.text}
          onChange={(e) => setLinkInput({ ...linkInput, text: e.target.value })}
        />
        <button onClick={handleLinkInsert}>Insert Link</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  )
}
