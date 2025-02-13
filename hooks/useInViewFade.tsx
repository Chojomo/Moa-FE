import { useState, useEffect, useRef } from 'react'

export function useFadeIn<T extends HTMLElement>(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<T | null>(null)

  useEffect(() => {
    const currentRef = elementRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  return { isVisible, elementRef }
}
