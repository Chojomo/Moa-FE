import { IconProps } from '@/types'
import { Svg } from './index'

export default function Cancel2({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 16}
      height={height || 16}
      viewBox={[0, 0, 16, 16]}
      className={className || ''}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.1394 3.80676L12.1927 2.86011L7.99938 7.06011L3.80603 2.86011L2.85938 3.80676L7.05937 8.00011L2.85938 12.1935L3.80603 13.1401L7.99938 8.94011L12.1927 13.1401L13.1394 12.1935L8.93937 8.00011L13.1394 3.80676Z"
        fill="currentColor"
      />
    </Svg>
  )
}
