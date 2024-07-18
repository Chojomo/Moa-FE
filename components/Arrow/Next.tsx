'use client'

import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

export default function Next() {
  const handleClick = () => {}

  return (
    <>
      <Tooltip
        position={{ top: '56px', right: '7px' }}
        arrowPosition={{ right: '8px', bottom: '100%' }}
        arrowDirection="top"
      >
        ggg흠냐흠냐g
      </Tooltip>
      <button
        type="button"
        aria-label="next"
        className="fixed left-[50%] bottom-[30px] animate-float"
      >
        <Icon name="Arrow" width={53} height={26} skeletonClassName="rounded" />
      </button>
    </>
  )
}
