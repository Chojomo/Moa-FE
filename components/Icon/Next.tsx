import { IconProps } from '@/types'
import { Svg } from './index'

export default function Next({ className, width, height, fill = '#A6A6A6' }: IconProps) {
  return (
    <Svg
      width={width || 53}
      height={height || 26}
      viewBox={[0, 0, 53, 26]}
      className={className || ''}
    >
      <path
        d="M3 3L26.5 23L50 3"
        stroke={fill}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
