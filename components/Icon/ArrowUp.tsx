import { IconProps } from '@/types'
import { Svg } from './index'

export default function ArrowUp({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 17}
      height={height || 20}
      viewBox={[0, 0, 17, 20]}
      className={className || ''}
    >
      <path
        d="M8.5 1L16 8.5M8.5 1L1 8.5M8.5 1V18.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
