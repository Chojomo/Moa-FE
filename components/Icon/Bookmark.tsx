import { IconProps } from '@/types'
import { Svg } from './index'

export default function Bookmark({ className, width, height, fill = '#43D8AA' }: IconProps) {
  return (
    <Svg
      width={width || 18}
      height={height || 24}
      viewBox={[0, 0, 18, 24]}
      className={className || ''}
    >
      <path
        d="M0 23.1429V2.57143C0 1.86429 0.252 1.25914 0.756 0.756C1.26 0.252857 1.86514 0.000857143 2.57143 0H15.4286C16.1357 0 16.7413 0.252 17.2453 0.756C17.7493 1.26 18.0009 1.86514 18 2.57143V23.1429L9 19.2857L0 23.1429ZM2.57143 19.2214L9 16.4571L15.4286 19.2214V2.57143H2.57143V19.2214Z"
        fill={fill}
      />
    </Svg>
  )
}
