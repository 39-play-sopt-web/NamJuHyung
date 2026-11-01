import { RANKING_KEY } from '../constants/ranking'

export function getRecords() {
  return JSON.parse(localStorage.getItem(RANKING_KEY) ?? '[]')
}

export function saveRecord(record) {
  localStorage.setItem(RANKING_KEY, JSON.stringify([...getRecords(), record]))
}

export function clearRecords() {
  localStorage.removeItem(RANKING_KEY)
}

export function sortRecords(records) {
  return [...records].sort((a, b) => b.level - a.level || a.time - b.time)
}
