import { useTheme } from 'next-themes'
import { IconProps } from '@/types'
import { Svg } from './index'

export default function SortOpen({ className, width, height }: IconProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Svg
      width={width || 8}
      height={height || 14}
      viewBox={[0, 0, 8, 14]}
      className={className || ''}
    >
      <path
        d="M7.63774 0.293487C7.83218 0.481464 7.94141 0.73638 7.94141 1.00218C7.94141 1.26798 7.83218 1.52289 7.63774 1.71087L2.50374 6.67272L7.63774 11.6346C7.82667 11.8236 7.93121 12.0768 7.92884 12.3397C7.92648 12.6025 7.8174 12.8539 7.6251 13.0397C7.4328 13.2256 7.17267 13.331 6.90072 13.3333C6.62878 13.3356 6.36679 13.2345 6.17118 13.0519L0.3039 7.38141C0.109461 7.19343 0.000229563 6.93852 0.000229573 6.67272C0.000229583 6.40692 0.109461 6.152 0.3039 5.96403L6.17118 0.293487C6.36568 0.105567 6.62944 -6.372e-08 6.90446 -5.03628e-08C7.17948 -3.70055e-08 7.44324 0.105567 7.63774 0.293487Z"
        fill={resolvedTheme === 'light' ? '#000000' : '#ffffff'}
      />
    </Svg>
  )
}
