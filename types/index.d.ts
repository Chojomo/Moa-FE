export type ClassName = {
  className?: string
}

export type Child = {
  children?: React.ReactNode
} & ClassName

export type Size = {
  width: number
  height: number
}

export type IconProps = {
  fill?: string
} & ClassName &
  Size

export type PreviwMode = 'live' | 'edit' | 'preview'
