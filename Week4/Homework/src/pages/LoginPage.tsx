import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { OutlineButton, PrimaryButton } from '../components/common/Button'
import Modal from '../components/common/Modal'
import { MODAL_MESSAGES } from '../constants/messages'
import { PARTS } from '../constants/parts'
import type { Part } from '../constants/parts'
import { ROUTES } from '../constants/routes'
import { useIssueCode } from '../hooks/mutations/useIssueCode'
import { useModal } from '../hooks/useModal'
import { hasAuth } from '../utils/auth'
import { getErrorMessage } from '../utils/error'

export default function LoginPage() {
  const [part, setPart] = useState<Part | ''>('')
  const navigate = useNavigate()
  const { openModal, modalProps } = useModal()
  const { mutate: issueCode, isPending } = useIssueCode()

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!part) return
    issueCode(part, {
      onSuccess: () =>
        openModal({
          message: MODAL_MESSAGES.CODE_ISSUED,
          onClose: () =>
            navigate(ROUTES.BOARD, { replace: true, flushSync: true }),
        }),
      onError: (error) =>
        openModal({
          message: getErrorMessage(error, MODAL_MESSAGES.ISSUE_FAILED),
        }),
    })
  }

  const handlePartChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = PARTS.find((name) => name === event.target.value)
    if (selected) setPart(selected)
  }

  const handleListClick = () => {
    if (!hasAuth()) {
      openModal({ message: MODAL_MESSAGES.AUTH_REQUIRED })
      return
    }
    navigate(ROUTES.BOARD)
  }

  return (
    <Wrapper>
      <Header>
        <Title>PLAY SOPT 게시판</Title>
        <Description>파트를 선택하면 코드가 발급됩니다</Description>
      </Header>

      <Content>
        <Form onSubmit={handleSubmit}>
          <Select
            aria-label="파트 선택"
            value={part}
            onChange={handlePartChange}
          >
            <option value="" disabled>
              파트를 선택하세요
            </option>
            {PARTS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          <IssueButton type="submit" disabled={!part || isPending}>
            {isPending ? '발급 중...' : '코드 발급받기'}
          </IssueButton>
        </Form>

        <OutlineButton type="button" onClick={handleListClick}>
          게시판 목록 보기
        </OutlineButton>
      </Content>

      <Modal {...modalProps} />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 64px 24px;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 0 16px ${({ theme }) => theme.colors.primary};
`

const Description = styled.p`
  opacity: 0.7;
`

const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Form = styled.form`
  display: flex;
  gap: 8px;
`

const chevron = (color: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M1 1.5l5 5 5-5' fill='none' stroke='${color}' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>`,
  )}")`

const Select = styled.select`
  flex: 1;
  min-width: 0;
  padding: 10px 40px 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  background-image: ${({ theme }) => chevron(theme.colors.secondary)};
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

const IssueButton = styled(PrimaryButton)`
  flex-shrink: 0;
`
