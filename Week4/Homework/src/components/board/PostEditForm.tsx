import { useState } from 'react'
import type { SubmitEvent } from 'react'
import styled from '@emotion/styled'
import { EDIT_STEPS } from '../../constants/post'
import { MODAL_MESSAGES } from '../../constants/messages'
import { useUpdatePost } from '../../hooks/mutations/useUpdatePost'
import { useModal } from '../../hooks/useModal'
import type { Post, UpdatePostRequest } from '../../types/post'
import { getErrorMessage } from '../../utils/error'
import { OutlineButton, PrimaryButton } from '../common/Button'
import Modal from '../common/Modal'
import WriteField from './WriteField'

interface PostEditFormProps {
  post: Post
  onClose: () => void
}

export default function PostEditForm({ post, onClose }: PostEditFormProps) {
  const [values, setValues] = useState<UpdatePostRequest>({
    title: post.title,
    content: post.content,
  })
  const { mutate: updatePost, isPending } = useUpdatePost(post.id)
  const { openModal, modalProps } = useModal()

  const isDisabled =
    isPending ||
    EDIT_STEPS.some(({ key, maxLength }) => {
      const value = values[key]
      return !value.trim() || value.length > maxLength
    })

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isDisabled) return

    updatePost(values, {
      onSuccess: () =>
        openModal({ message: MODAL_MESSAGES.UPDATE_SUCCESS, onClose }),
      onError: (error) =>
        openModal({
          message: getErrorMessage(error, MODAL_MESSAGES.UPDATE_FAILED),
        }),
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {EDIT_STEPS.map((step) => (
        <WriteField
          key={step.key}
          step={step}
          value={values[step.key]}
          onChange={(value) =>
            setValues((prev) => ({ ...prev, [step.key]: value }))
          }
        />
      ))}

      <Actions>
        <OutlineButton type="button" onClick={onClose}>
          취소
        </OutlineButton>
        <PrimaryButton type="submit" disabled={isDisabled}>
          {isPending ? '저장 중...' : '저장'}
        </PrimaryButton>
      </Actions>

      <Modal {...modalProps} />
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`
