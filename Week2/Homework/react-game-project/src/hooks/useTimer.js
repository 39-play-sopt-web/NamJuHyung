import { useEffect, useState } from 'react'

export function useTimer(onTick) {
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    if (startTime === null) return
    const id = setInterval(() => {
      onTick((Date.now() - startTime) / 1000)
    }, 10)
    return () => clearInterval(id)
  }, [startTime, onTick])

  const start = () => {
    setStartTime(Date.now())
  }

  const stop = () => {
    const elapsed = (Date.now() - startTime) / 1000
    setStartTime(null)
    return elapsed
  }

  return { start, stop }
}
