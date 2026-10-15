import { useState } from 'react'
import Header from './components/Header/Header'
import Game from './pages/Game/Game'
import Ranking from './pages/Ranking/Ranking'
import { MENU } from "./constants/menu"
import { DEFAULT_LEVEL } from "./constants/levels"

function App() {
  const [menu, setMenu] = useState(MENU.GAME)
  const [level, setLevel] = useState(DEFAULT_LEVEL)
  const [time, setTime] = useState(0)

  const isGameMenu = menu === MENU.GAME

  const handleMenuChange = (nextMenu) => {
    setMenu(nextMenu)
    setTime(0)
  }

  const handleLevelChange = (nextLevel) => {
    setLevel(nextLevel)
    setTime(0)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        menu={menu}
        onMenuChange={handleMenuChange}
        level={level}
        onLevelChange={handleLevelChange}
        time={time}
      />

      <main
        className={`flex-grow-1 d-flex justify-content-center ${ isGameMenu ? 'align-items-center' : 'align-items-start pt-5'}`}
      >
        {isGameMenu ? <Game key={level} level={level} onTimeChange={setTime} /> : <Ranking />}
      </main>
    </div>
  )
}

export default App
