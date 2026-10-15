import { LEVELS } from '../../constants/levels'
import { MENUS } from "../../constants/menu"

function Header({ menu, onMenuChange, level, onLevelChange, time }) {

  return (
    <header className="bg-white border-bottom shadow-sm sticky-top">
      <div className="container-fluid px-4 d-flex align-items-center py-3">
        {/* 왼쪽: 이름 */}
        <h1 className="header-side fw-bold fs-5 mb-0">🔢숫자 클릭 게임</h1>

        {/* 가운데: 메뉴 */}
        <nav aria-label="메뉴">
          <ul className="nav nav-pills gap-2">
            {MENUS.map((item) => (
              <li className="nav-item" key={item.id}>
                <button
                  type="button"
                  className={`nav-link ${menu === item.id ? 'active' : ''}`}
                  onClick={() => onMenuChange(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 오른쪽:게임일 때만 레벨 선택 + 타이머 */}
        <div className="header-side d-flex justify-content-end align-items-center gap-3">
          {menu === 'game' && (
            <>
              <select
                className="form-select form-select-sm w-auto"
                value={level}
                onChange={(e) => onLevelChange(Number(e.target.value))}
                aria-label="레벨 선택"
              >
                {LEVELS.map((lv) => (
                  <option key={lv.value} value={lv.value}>
                    Level {lv.value} ({lv.size}x{lv.size})
                  </option>
                ))}
              </select>

              <span className="badge text-bg-primary fs-6 fw-normal p-2">{time.toFixed(2)}초</span>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
