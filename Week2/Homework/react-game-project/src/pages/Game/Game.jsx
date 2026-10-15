import { useState } from 'react'
import { useTimer } from '../../hooks/useTimer'
import { LEVELS } from '../../constants/levels'
import { shuffle, range } from '../../utils/array'
import { saveRecord } from '../../utils/ranking'
import ResultModal from '../../components/Modal/ResultModal'
import './Game.css'

function Game({ level, onTimeChange }) {
  const { size, cellSize } = LEVELS.find((lv) => lv.value === level)
  const cellCount = size * size
  const lastNumber = cellCount * 2
  const timer = useTimer(onTimeChange)

  const [board, setBoard] = useState(() => shuffle(range(1, cellCount)))
  const [queue, setQueue] = useState(() => shuffle(range(cellCount + 1, lastNumber)))
  const [next, setNext] = useState(1)
  const [result, setResult] = useState(null)

  const resetGame = () => {
    setBoard(shuffle(range(1, cellCount)))
    setQueue(shuffle(range(cellCount + 1, lastNumber)))
    setNext(1)
    setResult(null)
    onTimeChange(0)
  }

  const handleClick = (num, index) => {
    if (num !== next) return
    if (num === 1) timer.start()

    const newBoard = [...board]
    newBoard[index] = queue[0] ?? null
    setBoard(newBoard)
    setQueue(queue.slice(1))

    if (num === lastNumber) {
      const playTime = Number(timer.stop().toFixed(2))
      onTimeChange(playTime)
      saveRecord({ date: new Date().toISOString(), level, time: playTime })
      setResult(playTime)
      return
    }

    setNext(num + 1)
  }

  return (
    <section className="text-center">
      <p className="fs-5 mb-3">
        다음 숫자: <strong className="text-primary fs-2">{next}</strong> ({next} /{lastNumber})
      </p>

      <div
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${size}, auto)`,
          '--cell-size': `${cellSize}px`,
        }}
      >
        {board.map((num, index) =>
          num === null ? (
            <div key={`empty-${index}`} className="game-cell empty" />
          ) : (
            <button
              key={`${index}-${num}`}
              type="button"
              className="game-cell btn btn-outline-primary"
              onClick={() => handleClick(num, index)}
            >
              {num}
            </button>
          ),
        )}
      </div>

      {result !== null && <ResultModal time={result} level={level} onConfirm={resetGame} />}
    </section>
  )
}

export default Game
