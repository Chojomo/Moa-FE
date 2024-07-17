import { Icon } from '@/components/Icon'
import { tincolorIcon } from './tintcolor'

export const isLoginNav = (activeIndex: number) => {
  return [
    {
      index: 0,
      type: 'link',
      href: '/',
      minW: '70px',
      script: (
        <>
          <Icon
            name="Logo"
            width={35}
            height={35}
            className="mb-[10px]"
            skeletonClassName="rounded"
          />
          <p className="text-[20px] font-bold">Moa</p>
          <Icon
            name="Home"
            width={20}
            height={20}
            className="flex-center"
            skeletonClassName="rounded"
            fill={tincolorIcon(activeIndex, 0)}
          />
        </>
      ),
    },
    { index: 1, type: 'link', href: '/diary', minW: '70px', script: <p>Diary</p> },
    { index: 2, type: 'link', href: '/zip', minW: '70px', script: <p>ZIP</p> },
    { index: 3, type: 'button', minW: '55px', icon: { name: 'Search', width: 18, height: 18 } },
    {
      index: 4,
      type: 'link',
      href: '/user',
      minW: '55px',
      script: (
        <Icon
          name="User"
          width={18}
          height={20}
          skeletonClassName="rounded"
          fill={tincolorIcon(activeIndex, 4)}
        />
      ),
    },
    { index: 5, type: 'button', minW: '55px', icon: { name: 'Bell', width: 18, height: 18 } },
    { index: 6, type: 'button', minW: '55px', icon: { name: 'Logout', width: 20, height: 18 } },
  ]
}

export const notLoginNav = (activeIndex: number) => {
  return [
    {
      index: 0,
      type: 'link',
      href: '/',
      minW: '70px',
      script: (
        <>
          <Icon
            name="Logo"
            width={35}
            height={35}
            className="mb-[10px]"
            skeletonClassName="rounded"
          />
          <p className="text-[20px] font-bold">Moa</p>
          <Icon
            name="Home"
            width={20}
            height={20}
            className="flex-center"
            skeletonClassName="rounded"
            fill={tincolorIcon(activeIndex, 0)}
          />
        </>
      ),
    },
    { index: 1, type: 'link', href: '/diary', minW: '70px', script: <p>Diary</p> },
    { index: 2, type: 'link', href: '/zip', minW: '70px', script: <p>ZIP</p> },
    { index: 3, type: 'button', minW: '55px', icon: { name: 'Search', width: 18, height: 18 } },
    { index: 4, type: 'button', minW: '55px', icon: { name: 'Login', width: 20, height: 18 } },
  ]
}
