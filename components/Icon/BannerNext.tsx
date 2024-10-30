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
        d="M0.999999 16L7 8.5L1 1"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
