import { generatePath, Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { ROUTES } from '../../constants/routes'
import type { Post } from '../../types/post'
import { formatDate } from '../../utils/date'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { id, title, content, author, createdAt } = post

  return (
    <Card to={generatePath(ROUTES.BOARD_DETAIL, { postId: String(id) })}>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Meta>
        <span>{author}</span>
        <time dateTime={createdAt}>{formatDate(createdAt)}</time>
      </Meta>
    </Card>
  )
}

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

const Title = styled.h2`
  overflow: hidden;
  font-size: 18px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Content = styled.p`
  display: -webkit-box;
  flex: 1;
  overflow: hidden;
  line-height: 1.5;
  opacity: 0.7;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const Meta = styled.p`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 14px;
  opacity: 0.6;
`
