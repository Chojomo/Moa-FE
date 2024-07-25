import { IconProps } from '@/types'
import { Svg } from './index'

export default function NavArrowTop({ className, width, height, fill = '#A6A6A6' }: IconProps) {
  return (
    <Svg
      width={width || 20}
      height={height || 13}
      viewBox={[0, 0, 20, 13]}
      className={className || ''}
    >
      <path
        d="M16 9L8.5 1.5L1 9"
        stroke="white"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
