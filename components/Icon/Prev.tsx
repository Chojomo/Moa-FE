import { IconProps } from '@/types'
import { Svg } from './index'

export default function Prev({ className, width, height, fill = '#A6A6A6' }: IconProps) {
  return (
    <Svg
      width={width || 53}
      height={height || 26}
      viewBox={[0, 0, 53, 26]}
      className={className || ''}
    >
      <path
        d="M50 23L26.5 3L3 23"
        stroke={fill}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
