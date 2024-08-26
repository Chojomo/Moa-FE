'use client'

import { Editor } from '@tiptap/react'
import Button from '../Button'
import { Icon } from '../Icon'

type ToolbarProps = {
  editor: Editor
}

export default function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className="h-[60px] flex-center gap-[25px]">
      <Button
        type="button"
        ariaLabel="heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Icon name="Heading1" width={20} height={18} />
      </Button>
      <Button
        type="button"
        ariaLabel="heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Icon name="Heading2" width={24} height={18} />
      </Button>
      <Button
        type="button"
        ariaLabel="heading 3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Icon name="Heading3" width={23} height={18} />
      </Button>
    </div>
  )
}
