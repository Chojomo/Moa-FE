import { IconProps } from '@/types'
import { Svg } from './index'

export default function Bookmark({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 19}
      height={height || 24}
      viewBox={[0, 0, 19, 24]}
      className={className || ''}
    >
      <path
        d="M0 23.1429V2.57143C0 1.86429 0.252197 1.25914 0.75659 0.756C1.26098 0.252857 1.8666 0.000857143 2.57344 0H15.4406C16.1483 0 16.7544 0.252 17.2588 0.756C17.7632 1.26 18.0149 1.86514 18.0141 2.57143V23.1429L9.00703 19.2857L0 23.1429ZM2.57344 19.2214L9.00703 16.4571L15.4406 19.2214V2.57143H2.57344V19.2214Z"
        fill="currentColor"
      />
    </Svg>
  )
}
