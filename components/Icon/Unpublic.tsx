import { IconProps } from '@/types'
import { Svg } from './index'

export default function Unpublic({ className, width, height, fill = '#2C72DC' }: IconProps) {
  return (
    <Svg
      width={width || 18}
      height={height || 22}
      viewBox={[0, 0, 18, 22]}
      className={className || ''}
    >
      <path
        d="M5 9V6C5 4.93913 5.42143 3.92172 6.17157 3.17157C6.92172 2.42143 7.93913 2 9 2C10.0609 2 11.0783 2.42143 11.8284 3.17157C12.5786 3.92172 13 4.93913 13 6V9"
        stroke={fill}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M2 9H16V18C16 18.5304 15.7893 19.0391 15.4142 19.4142C15.0391 19.7893 14.5304 20 14 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V9Z"
        stroke={fill}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 14.5H11.51V14.51H11.5V14.5Z"
        stroke={fill}
        strokeWidth="3.75"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
