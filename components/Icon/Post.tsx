import { IconProps } from '@/types'
import { Svg } from './index'

export default function Post({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 30}
      height={height || 36}
      viewBox={[0, 0, 30, 36]}
      className={className || ''}
    >
      <path
        d="M21.9686 32.4295H3.13838V9.41596H14.1227V5.64941H3.13838C1.41227 5.64941 0 7.34436 0 9.41596V32.0152C0 34.0868 1.41227 35.7818 3.13838 35.7818H21.9686C23.6948 35.7818 25.107 34.0868 25.107 32.0152V18.8323H21.9686V32.4295Z"
        fill="currentColor"
      />
      <path
        d="M25.1071 0H21.9687V5.64981H17.2612C17.2769 5.66865 17.2612 9.41636 17.2612 9.41636H21.9687V15.0473C21.9844 15.0662 25.1071 15.0473 25.1071 15.0473V9.41636H29.8147V5.64981H25.1071V0ZM6.27686 13.1829H18.8304V16.9494H6.27686V13.1829ZM6.27686 18.8327V22.5993H18.8304V18.8327H14.1228H6.27686ZM6.27686 24.4825H18.8304V28.2491H6.27686V24.4825Z"
        fill="currentColor"
      />
    </Svg>
  )
}
