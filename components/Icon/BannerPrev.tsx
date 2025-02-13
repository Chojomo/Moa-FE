import { IconProps } from '@/types'
import { Svg } from './index'

export default function BannerPrev({ className, width, height, fill = '#FFFFFF' }: IconProps) {
  return (
    <Svg
      width={width || 8}
      height={height || 17}
      viewBox={[0, 0, 8, 17]}
      className={className || ''}
    >
      <path
        d="M7 1L1 8.5L7 16"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
