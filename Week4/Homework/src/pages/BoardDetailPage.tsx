import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import PostEditForm from '../components/board/PostEditForm'
import {
  DangerButton,
  OutlineButton,
  OutlineLink,
} from '../components/common/Button'
import Modal from '../components/common/Modal'
import { MODAL_MESSAGES } from '../constants/messages'
import { ROUTES } from '../constants/routes'
import { useDeletePost } from '../hooks/mutations/useDeletePost'
import { usePost } from '../hooks/queries/usePost'
import { useModal } from '../hooks/useModal'
import { hasAuth } from '../utils/auth'
import { formatDate } from '../utils/date'
import { getErrorMessage } from '../utils/error'

export default function BoardDetailPage() {
  const params = useParams()
  const postId = Number(params.postId)
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const { data: post, isPending, isError } = usePost(postId)
  const {
    mutate: deletePost,
    isPending: isDeleting,
    removeDetail,
  } = useDeletePost()
  const { openModal, modalProps } = useModal()

  const handleEdit = () => {
    if (!hasAuth()) {
      openModal({ message: MODAL_MESSAGES.AUTH_REQUIRED })
      return
    }
    setIsEditing(true)
  }

  const requestDelete = () => {
    deletePost(postId, {
      onSuccess: () =>
        openModal({
          message: MODAL_MESSAGES.DELETE_SUCCESS,
          onClose: () => {
            navigate(ROUTES.BOARD, { replace: true, flushSync: true })
            removeDetail(postId)
          },
        }),
      onError: (error) =>
        openModal({
          message: getErrorMessage(error, MODAL_MESSAGES.DELETE_FAILED),
        }),
    })
  }

  const handleDelete = () => {
    if (!hasAuth()) {
      openModal({ message: MODAL_MESSAGES.AUTH_REQUIRED })
      return
    }
    openModal({
      message: MODAL_MESSAGES.DELETE_CONFIRM,
      onConfirm: requestDelete,
    })
  }

  if (!Number.isInteger(postId) || isError) {
    return (
      <Status>
        <p>게시글을 찾을 수 없습니다</p>
        <OutlineLink to={ROUTES.BOARD}>목록으로</OutlineLink>
      </Status>
    )
  }

  if (isPending) {
    return (
      <Status>
        <p>불러오는 중...</p>
      </Status>
    )
  }

  if (isEditing) {
    return (
      <Article>
        <Title>게시글 수정</Title>
        <PostEditForm post={post} onClose={() => setIsEditing(false)} />
      </Article>
    )
  }

  const { title, content, author, createdAt } = post

  return (
    <Article>
      <Header>
        <Title>{title}</Title>
        <Meta>
          <span>{author}</span>
          <time dateTime={createdAt}>{formatDate(createdAt)}</time>
        </Meta>
      </Header>

      <Content>{content}</Content>

      <Actions>
        <OutlineButton type="button" onClick={() => navigate(ROUTES.BOARD)}>
          뒤로가기
        </OutlineButton>
        <ButtonGroup>
          <OutlineButton type="button" onClick={handleEdit}>
            수정
          </OutlineButton>
          <DangerButton
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </DangerButton>
        </ButtonGroup>
      </Actions>

      <Modal {...modalProps} isPending={isDeleting} />
    </Article>
  )
}

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 720px;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  line-height: 1.3;
  word-break: keep-all;
`

const Meta = styled.p`
  display: flex;
  gap: 12px;
  font-size: 14px;
  opacity: 0.6;
`

const Content = styled.p`
  min-height: 200px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
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

const Status = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 64px 0;
`
