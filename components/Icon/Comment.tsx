import { IconProps } from '@/types'
import { Svg } from './index'

export default function Copy({ className, width, height, fill = '#43D8AA' }: IconProps) {
  return (
    <Svg
      width={width || 14}
      height={height || 14}
      viewBox={[0, 0, 14, 14]}
      className={className || ''}
    >
      <path
        d="M7.00134 13C8.30996 12.9997 9.58261 12.5716 10.6253 11.7809C11.6681 10.9902 12.4237 9.88027 12.7771 8.62027C13.1305 7.36027 13.0622 6.01928 12.5828 4.80166C12.1033 3.58404 11.2389 2.55656 10.1213 1.87579C9.00368 1.19503 7.69415 0.898315 6.39226 1.03087C5.09037 1.16342 3.86751 1.71797 2.91003 2.61C1.95256 3.50204 1.31297 4.68265 1.08874 5.97191C0.864514 7.26118 1.06794 8.58841 1.66801 9.75133L1.00135 13L4.25001 12.3333C5.07401 12.7593 6.01001 13 7.00134 13Z"
        stroke={fill}
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.00195 7H4.00862V7.00667H4.00195V7ZM7.00195 7H7.00862V7.00667H7.00195V7ZM10.0019 7H10.0086V7.00667H10.0019V7Z"
        stroke={fill}
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
