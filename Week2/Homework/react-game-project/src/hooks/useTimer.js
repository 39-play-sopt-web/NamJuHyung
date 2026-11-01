import { useEffect, useState } from 'react'

export function useTimer(startTime, endTime) {
  const [now, setNow] = useState(0)

  useEffect(() => {
    if (startTime === null || endTime !== null) return
    const id = setInterval(() => {
      setNow(Date.now())
    }, 10)
    return () => clearInterval(id)
  }, [startTime, endTime])

  if (startTime === null) return 0
  return Math.max((endTime ?? now) - startTime, 0) / 1000
}
