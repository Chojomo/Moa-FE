import { IconProps } from '@/types'
import { Svg } from './index'

export default function Heart({ className, width, height, fill = '#ef4444' }: IconProps) {
  return (
    <Svg
      width={width || 25}
      height={height || 23}
      viewBox={[0, 0, 25, 23]}
      className={className || ''}
    >
      <path
        d="M12.5 22.9375L10.6875 21.2875C4.25 15.45 0 11.5875 0 6.875C0 3.0125 3.025 0 6.875 0C9.05 0 11.1375 1.0125 12.5 2.6C13.8625 1.0125 15.95 0 18.125 0C21.975 0 25 3.0125 25 6.875C25 11.5875 20.75 15.45 14.3125 21.2875L12.5 22.9375Z"
        fill="currentColor"
      />
    </Svg>
  )
}
