import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

export default function Footer() {
  return (
    <footer className="fixed left-0 bottom-0 w-full h-[60px] bg-soft-bg backdrop-blur-sm flex items-center justify-between px-[20px]">
      <Button type="button" ariaLabel="뒤로가기 버튼" className="px-3 py-1">
        <Icon name="Back" width={20} height={20} />
      </Button>
      <div className="flex items-center gap-[30px]">
        <Button type="button" ariaLabel="좋아요 버튼" className="flex items-center gap-3">
          <Icon name="Unlike" width={22} height={22} />
          <span className="text-[#A6A6A6]">32</span>
        </Button>
        <Button type="button" ariaLabel="댓글 버튼" className="flex items-center gap-3">
          <Icon name="Comment" width={21} height={21} fill="#A6A6A6" />
          <span className="text-[#A6A6A6]">32</span>
        </Button>
        <Button type="button" ariaLabel="북마크 버튼">
          <Icon name="Bookmark" width={20} height={20} />
        </Button>
        <Button type="button" ariaLabel="공유 버튼">
          <Icon name="Share" width={18} height={18} />
        </Button>
        <Button type="button" ariaLabel="메뉴 버튼" className="px-2 py-2">
          <Icon name="Kebab" width={4} height={16} />
        </Button>
      </div>
    </footer>
  )
}
