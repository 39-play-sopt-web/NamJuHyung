import { useState } from 'react'
import type { SubmitEvent } from 'react'
import styled from '@emotion/styled'
import { SEARCH_KEYWORD_LENGTH } from '../../constants/post'
import { PrimaryButton } from '../common/Button'
import { Input } from '../common/Input'

interface SearchBarProps {
  keyword: string
  onSearch: (keyword: string) => void
}

export default function SearchBar({ keyword, onSearch }: SearchBarProps) {
  const [input, setInput] = useState(keyword)
  const [prevKeyword, setPrevKeyword] = useState(keyword)
  const trimmed = input.trim()

  if (keyword !== prevKeyword) {
    setPrevKeyword(keyword)
    setInput(keyword)
  }

  const handleChange = (nextInput: string) => {
    setInput(nextInput)
    if (!nextInput.trim()) onSearch('')
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(trimmed)
  }

  return (
    <Form role="search" onSubmit={handleSubmit}>
      <SearchInput
        aria-label="제목 검색"
        type="search"
        placeholder="제목으로 검색하세요"
        maxLength={SEARCH_KEYWORD_LENGTH.MAX}
        value={input}
        onChange={(event) => handleChange(event.target.value)}
      />
      <PrimaryButton
        type="submit"
        disabled={trimmed.length < SEARCH_KEYWORD_LENGTH.MIN}
      >
        검색
      </PrimaryButton>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  gap: 8px;
`

const SearchInput = styled(Input)`
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
`
