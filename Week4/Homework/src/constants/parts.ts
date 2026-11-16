export const PARTS = ['WEB', 'iOS', 'ANDROID'] as const

export type Part = (typeof PARTS)[number]
