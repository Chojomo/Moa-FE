type Position = {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

type TooltipProps = {
  position: Position
  arrowPosition: Position
  arrowDirection: 'top' | 'bottom' | 'left' | 'right'
  children?: React.ReactNode
}

export default function Tooltip({
  position = { top: '0%', bottom: '0%', left: '0%', right: '0%' },
  arrowPosition = { top: '0%', bottom: '0%', left: '0%', right: '0%' },
  arrowDirection = 'top',
  children,
}: TooltipProps) {
  const baseStyle =
    'tooltip top-[5px] right-[10px] rounded-[4px] text-[12px] text-[#ffffff] bg-[#333333]'

  const positionClasses = `
    ${position.top ? `top-[${position.top}]` : ''}
    ${position.bottom ? `bottom-[${position.bottom}]` : ''}
    ${position.left ? `left-[${position.left}]` : ''}
    ${position.right ? `right-[${position.right}]` : ''}
  `

  const arrowPositionClasses = `
    ${arrowPosition.top ? ` after:top-[${arrowPosition.top}] ` : ''} ${arrowPosition.bottom ? ` after:bottom-[${arrowPosition.bottom}] ` : ''} ${arrowPosition.left ? ` after:left-[${arrowPosition.left}] ` : ''} ${arrowPosition.right ? ` after:right-[${arrowPosition.right}] a` : ''}
  `

  const arrowDirectionClasses = `
    ${arrowDirection === 'top' ? 'tooltip-top' : ''}
    ${arrowDirection === 'bottom' ? 'tooltip-bottom' : ''}
    ${arrowDirection === 'left' ? 'tooltip-left' : ''}
    ${arrowDirection === 'right' ? 'tooltip-right' : ''}
  `

  return (
    <span
      className={`${baseStyle} ${positionClasses} ${arrowPositionClasses} ${arrowDirectionClasses}`}
    >
      {children}
    </span>
  )
}
