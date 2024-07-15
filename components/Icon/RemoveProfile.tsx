import { IconProps } from '@/types'
import { Svg } from './index'

export default function RemoveProfile({ className, width, height, fill = '#80B0A2' }: IconProps) {
  return (
    <Svg
      width={width || 21}
      height={height || 20}
      viewBox={[0, 0, 21, 20]}
      className={className || ''}
    >
      <path
        d="M19 7V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H10M14 3H20"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 12.9997L15.914 9.9137C15.5389 9.53876 15.0303 9.32812 14.5 9.32812C13.9697 9.32812 13.4611 9.53876 13.086 9.9137L4 18.9997"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
