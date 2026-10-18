import { useState } from 'react'
import { getRecords, clearRecords, sortRecords } from '../../utils/ranking'
import { formatDate } from '../../utils/date'
import './Ranking.css'

function Ranking() {
  const [records, setRecords] = useState(() => sortRecords(getRecords()))

  const handleReset = () => {
    clearRecords()
    setRecords([])
  }

  return (
    <section className="ranking-board">
      <div className="bg-white d-flex justify-content-between align-items-center py-4">
        <h2 className="h4 mb-0 fw-bold">🏆랭킹</h2>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={handleReset}
          disabled={records.length === 0}
        >
          초기화
        </button>
      </div>

      {records.length === 0 ? (
        <p className="text-center text-secondary py-5 mb-0">아직 기록이 없어요.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover text-center align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>순위</th>
                <th>레벨</th>
                <th>플레이 시간</th>
                <th>기록 시각</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.date}>
                  <td className="fw-bold">{index + 1}</td>
                  <td>Level {record.level}</td>
                  <td className="text-primary fw-semibold">{record.time.toFixed(2)}초</td>
                  <td className="text-secondary">{formatDate(record.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Ranking
