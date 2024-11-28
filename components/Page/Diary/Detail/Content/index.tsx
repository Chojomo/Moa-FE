import { Icon } from '@/components/Icon'
import MDEditor from '@uiw/react-md-editor'

type ContentProps = {
  content: string
}

export default function Content({ content }: ContentProps) {
  return (
    <div className="w-full break-words">
      <p className="flex justify-end items-center gap-[7px] pt-[25px]">
        <span className="text-[13px] font-semibold">공개</span>
        <Icon name="Public" width={20} height={20} />
        {/* <Icon name="Unpublic" width={20} height={20} /> */}
      </p>
      <MDEditor.Markdown className="px-[25px] py-[10%]" source={content} />
    </div>
  )
}
