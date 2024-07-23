'use client'

import { useState, useEffect, memo } from 'react'
import { pipe, join } from '@fxts/core'
import { ClassName, Child, Size } from '@/types'

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
  fill?: string
} & Size &
  ClassName

function LazyIconComponent(props: IconProps) {
  const { name } = props
  const [Component, setComponent] = useState<React.ElementType | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const { default: ImportedComponent } = await import(`./${name}`)
        setComponent(() => ImportedComponent)
      } catch (error) {
        console.error(`Error loading icon: ${name}`, error)
        setComponent(() => null)
      }
    }
    loadComponent()
  }, [name])

  if (!Component) {
    return null
  }

  return <Component {...props} />
}

LazyIconComponent.displayName = 'LazyIconComponent'

const Icon = memo((props: IconProps) => {
  return <LazyIconComponent {...props} />
})

Icon.displayName = 'Icon'

export default Icon

export { Svg, Icon }
