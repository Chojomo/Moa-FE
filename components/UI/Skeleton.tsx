type SkeletonProps = {
  width?: number
  height?: number
  className?: string
}

function Skeleton({ width, height, className }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidde ${className} animate-shimmer`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
        backgroundImage:
          'linear-gradient(to right, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 55%, rgba(255, 255, 255, 0) 75%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '200% 100%',
        backgroundPosition: '100%',
      }}
    />
  )
}

export default Skeleton
