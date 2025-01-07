import { IconProps } from '@/types'
import { Svg } from './index'

export default function Check2({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 24}
      height={height || 24}
      viewBox={[0, 0, 24, 24]}
      className={className || ''}
    >
      <path
        d="M9.54961 17.9996L3.84961 12.2996L5.27461 10.8746L9.54961 15.1496L18.7246 5.97461L20.1496 7.39961L9.54961 17.9996Z"
        fill="currentColor"
      />
    </Svg>
  )
}
