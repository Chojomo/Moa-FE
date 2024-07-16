'use client'

import { lazy, useMemo, Suspense, memo } from 'react'
import { pipe, join } from '@fxts/core'
import { ClassName, Child, Size } from '@/types'
import Skeleton from '../UI/Skeleton'

type SvgProps = {
  width: number
  height: number
  viewBox: [number, number, number, number]
  fill?: string
} & Child

function Svg(props: SvgProps) {
  const { className, width, height, viewBox, fill, children } = props
  return (
    <svg
      className={className || ''}
      width={width}
      height={height}
      viewBox={pipe(viewBox, join(' '))}
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

type IconProps = {
  name: string
  skeletonClassName?: string
  fill?: string
} & Size &
  ClassName

function LazyIconComponent(props: IconProps) {
  const { name, width, height, skeletonClassName } = props
  const Component = useMemo(() => lazy(() => import(`./${name}`)), [name])
  return (
    <Suspense fallback={<Skeleton width={width} height={height} className={skeletonClassName} />}>
      <Component {...props} />
    </Suspense>
  )
}

LazyIconComponent.displayName = 'LazyIconComponent'

const Icon = memo((props: IconProps) => {
  return <LazyIconComponent {...props} />
})

Icon.displayName = 'Icon'

export default Icon

export { Svg, Icon }
