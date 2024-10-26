import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

export default function Progress() {
  return (
    <div className="w-full flex flex-col gap-[7px]">
      <div className="w-full flex justify-between items-center">
        <p className="text-[#FFFFFFCC] text-[10px]">
          <span className="text-white">1</span> / 4
        </p>
        <Button
          type="button"
          ariaLabel="progress play button"
          className="bg-[#FFFFFF33] rounded-full p-1"
        >
          <Icon name="Pause" width={10} height={10} />
        </Button>
      </div>
      <div className="w-full h-[2px]">
        <div className="relative w-full h-full bg-[#B8B8B8]">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-white" />
        </div>
      </div>
    </div>
  )
}
