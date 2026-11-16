import { useEffect, useRef } from 'react'

interface UseIntersectOptions {
  onIntersect: () => void
  enabled?: boolean
  rootMargin?: string
}

export const useIntersect = <T extends Element>({
  onIntersect,
  enabled = true,
  rootMargin = '200px',
}: UseIntersectOptions) => {
  const targetRef = useRef<T>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target || !enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect()
      },
      { rootMargin },
    )
    observer.observe(target)

    return () => observer.disconnect()
  }, [enabled, onIntersect, rootMargin])

  return targetRef
}
