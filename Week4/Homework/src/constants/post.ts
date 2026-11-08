import type { Post } from '../types/post'

export const POST_MAX_LENGTH = {
  TITLE: 50,
  CONTENT: 1000,
  AUTHOR: 20,
} as const

export type WriteStepKey = keyof Pick<Post, 'title' | 'content' | 'author'>

export interface WriteStep<K extends WriteStepKey = WriteStepKey> {
  key: K
  label: string
  placeholder: string
  maxLength: number
  errorMessage: string
  multiline?: boolean
}

const TITLE_STEP: WriteStep<'title'> = {
  key: 'title',
  label: '제목',
  placeholder: '제목을 입력하세요',
  maxLength: POST_MAX_LENGTH.TITLE,
  errorMessage: `제목은 ${POST_MAX_LENGTH.TITLE}자 이하로 입력해주세요`,
}

const CONTENT_STEP: WriteStep<'content'> = {
  key: 'content',
  label: '본문',
  placeholder: '본문을 입력하세요',
  maxLength: POST_MAX_LENGTH.CONTENT,
  errorMessage: `본문은 ${POST_MAX_LENGTH.CONTENT}자 이하로 입력해주세요`,
  multiline: true,
}

const AUTHOR_STEP: WriteStep<'author'> = {
  key: 'author',
  label: '작성자',
  placeholder: '작성자를 입력하세요',
  maxLength: POST_MAX_LENGTH.AUTHOR,
  errorMessage: `작성자는 ${POST_MAX_LENGTH.AUTHOR}자 이하로 입력해주세요`,
}

export const WRITE_STEPS: WriteStep[] = [TITLE_STEP, CONTENT_STEP, AUTHOR_STEP]

export const EDIT_STEPS: WriteStep<'title' | 'content'>[] = [
  TITLE_STEP,
  CONTENT_STEP,
]

export const POST_PAGE_SIZE = 10

export const SEARCH_KEYWORD_LENGTH = {
  MIN: 2,
  MAX: 50,
} as const
