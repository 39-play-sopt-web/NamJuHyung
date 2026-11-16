import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SubmitEvent } from 'react'
import styled from '@emotion/styled'
import WriteField from '../components/board/WriteField'
import {
  OutlineButton,
  OutlineLink,
  PrimaryButton,
} from '../components/common/Button'
import { WRITE_STEPS } from '../constants/post'
import type { WriteStepKey } from '../constants/post'
import Modal from '../components/common/Modal'
import { MODAL_MESSAGES } from '../constants/messages'
import { ROUTES } from '../constants/routes'
import { useCreatePost } from '../hooks/mutations/useCreatePost'
import { useModal } from '../hooks/useModal'
import { getErrorMessage } from '../utils/error'

export default function BoardWritePage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState<Record<WriteStepKey, string>>({
    title: '',
    content: '',
    author: '',
  })
  const navigate = useNavigate()
  const { mutate: createPost, isPending } = useCreatePost()
  const { openModal, modalProps } = useModal()

  const step = WRITE_STEPS[stepIndex]
  const value = values[step.key]
  const isLastStep = stepIndex === WRITE_STEPS.length - 1
  const isDisabled = !value.trim() || value.length > step.maxLength || isPending

  const handleChange = (nextValue: string) => {
    setValues((prev) => ({ ...prev, [step.key]: nextValue }))
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isDisabled) return

    if (!isLastStep) {
      setStepIndex((prev) => prev + 1)
      return
    }

    createPost(values, {
      onSuccess: ({ author }) =>
        openModal({
          message: MODAL_MESSAGES.CREATE_SUCCESS(author),
          onClose: () =>
            navigate(ROUTES.BOARD, { replace: true, flushSync: true }),
        }),
      onError: (error) =>
        openModal({
          message: getErrorMessage(error, MODAL_MESSAGES.CREATE_FAILED),
        }),
    })
  }

  return (
    <Wrapper>
      <Title>게시글 작성</Title>

      <Form onSubmit={handleSubmit}>
        <WriteField step={step} value={value} onChange={handleChange} />

        <Actions>
          <OutlineLink to={ROUTES.BOARD}>목록으로</OutlineLink>
          <ButtonGroup>
            {stepIndex > 0 && (
              <OutlineButton
                type="button"
                onClick={() => setStepIndex((prev) => prev - 1)}
              >
                이전
              </OutlineButton>
            )}
            <PrimaryButton type="submit" disabled={isDisabled}>
              {isLastStep ? '작성' : '다음'}
            </PrimaryButton>
          </ButtonGroup>
        </Actions>
      </Form>

      <Modal {...modalProps} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 640px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`
