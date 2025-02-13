import { Icon } from '../Icon'

type EntryProps = {
  size: 'small' | 'large'
}

export default function Entry({ size }: EntryProps) {
  return (
    <div
      className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-800 flex-center bg-[rgb(44,40,40,0.8)] ${size === 'small' ? 'w-[45px] h-[45px]' : 'w-[70px] h-[70px]'} rounded-full`}
    >
      <Icon
        name="DetailArrow"
        width={size === 'small' ? 13 : 18}
        height={size === 'small' ? 10 : 15}
      />
    </div>
  )
}
