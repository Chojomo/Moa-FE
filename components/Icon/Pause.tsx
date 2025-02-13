import { IconProps } from '@/types'
import { Svg } from './index'

export default function Pause({ className, width, height, fill = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={width || 9} height={height || 9} viewBox={[0, 0, 9, 9]} className={className || ''}>
      <path d="M2.25 7.125H3.75V1.875H2.25V7.125ZM5.25 1.875V7.125H6.75V1.875H5.25Z" fill={fill} />
    </Svg>
  )
}
