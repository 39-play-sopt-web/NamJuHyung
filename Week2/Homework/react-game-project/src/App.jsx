import { useState } from 'react'
import Header from './components/Header/Header'
import Game from './pages/Game/Game'
import Ranking from './pages/Ranking/Ranking'
import { MENU } from "./constants/menu"
import { DEFAULT_LEVEL } from "./constants/levels"

function App() {
  const [menu, setMenu] = useState(MENU.GAME)
  const [level, setLevel] = useState(DEFAULT_LEVEL)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [round, setRound] = useState(0)

  const isGameMenu = menu === MENU.GAME

  const resetTimer = () => {
    setStartTime(null)
    setEndTime(null)
  }

  const handleStart = () => {
    setStartTime(Date.now())
  }

  const handleEnd = () => {
    const now = Date.now()
    setEndTime(now)
    return (now - startTime) / 1000
  }

  const handleMenuChange = (nextMenu) => {
    setMenu(nextMenu)
    resetTimer()
  }

  const handleLevelChange = (nextLevel) => {
    setLevel(nextLevel)
    resetTimer()
  }

  const handleRestart = () => {
    setRound((prev) => prev + 1)
    resetTimer()
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        menu={menu}
        onMenuChange={handleMenuChange}
        level={level}
        onLevelChange={handleLevelChange}
        startTime={startTime}
        endTime={endTime}
      />

      <main
        className={`flex-grow-1 d-flex justify-content-center ${ isGameMenu ? 'align-items-center' : 'align-items-start pt-5'}`}
      >
        {isGameMenu ? (
          <Game
            key={`${level}-${round}`}
            level={level}
            onStart={handleStart}
            onEnd={handleEnd}
            onRestart={handleRestart}
          />
        ) : (
          <Ranking />
        )}
      </main>
    </div>
  )
}

export default App
