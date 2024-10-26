import { IconProps } from '@/types'
import { Svg } from './index'

export default function Play({ className, width, height, fill = '#FFFFFF' }: IconProps) {
  return (
    <Svg
      width={width || 11}
      height={height || 11}
      viewBox={[0, 0, 11, 11]}
      className={className || ''}
    >
      <path d="M8.36523 5.49985L3.89648 8.07981V2.91943L8.36523 5.49985Z" fill={fill} />
    </Svg>
  )
}
