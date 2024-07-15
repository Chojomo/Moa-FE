import { IconProps } from '@/types'
import { Svg } from './index'

export default function AddProfile({ className, width, height, fill = '#80B0A2' }: IconProps) {
  return (
    <Svg
      width={width || 21}
      height={height || 21}
      viewBox={[0, 0, 21, 21]}
      className={className || ''}
    >
      <path
        d="M19 11V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H3C2.46957 20 1.96086 19.7893 1.58579 19.4142C1.21071 19.0391 1 18.5304 1 18V4C1 3.46957 1.21071 2.96086 1.58579 2.58579C1.96086 2.21071 2.46957 2 3 2H10M14 4H20M17 1V7"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10C8.10457 10 9 9.10457 9 8C9 6.89543 8.10457 6 7 6C5.89543 6 5 6.89543 5 8C5 9.10457 5.89543 10 7 10Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 13.9997L15.914 10.9137C15.5389 10.5388 15.0303 10.3281 14.5 10.3281C13.9697 10.3281 13.4611 10.5388 13.086 10.9137L4 19.9997"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
