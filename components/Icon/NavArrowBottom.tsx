import { IconProps } from '@/types'
import { Svg } from './index'

export default function NavArrowBottom({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 20}
      height={height || 13}
      viewBox={[0, 0, 20, 13]}
      className={className || ''}
    >
      <path
        d="M1 1L8.5 8.5L16 1"
        stroke="white"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
