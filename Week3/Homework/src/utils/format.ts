const languageNames = new Intl.DisplayNames(['ko'], { type: 'language' })
const regionNames = new Intl.DisplayNames(['ko'], { type: 'region' })

export const formatDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return `${year}년 ${month}월 ${day}일`
}

export const formatRuntime = (minutes: number) =>
  `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`

export const formatMoney = (amount: number) =>
  amount > 0
    ? amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })
    : null

export const toLanguageName = (code: string) => languageNames.of(code) ?? code

export const toRegionName = (code: string) => regionNames.of(code) ?? code
