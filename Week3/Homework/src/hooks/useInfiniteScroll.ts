import { useCallback, useEffect, useRef } from 'react'

export const useInfiniteScroll = (onIntersect: () => void) => {
  const onIntersectRef = useRef(onIntersect)

  useEffect(() => {
    onIntersectRef.current = onIntersect
  })

  return useCallback((node: HTMLDivElement | null) => {
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersectRef.current()
      },
      { rootMargin: '800px' },
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [])
}
