import { useTimer } from '../../hooks/useTimer'

function Timer({ startTime, endTime }) {
  const time = useTimer(startTime, endTime)

  return <span className="badge text-bg-primary fs-6 fw-normal p-2">{time.toFixed(2)}초</span>
}

export default Timer
