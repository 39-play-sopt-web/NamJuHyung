import { useSearchParams } from 'react-router-dom'
import styled from '@emotion/styled'
import PostCard from '../components/board/PostCard'
import SearchBar from '../components/board/SearchBar'
import { OutlineButton } from '../components/common/Button'
import { SEARCH_PARAMS } from '../constants/routes'
import { usePosts } from '../hooks/queries/usePosts'
import { useIntersect } from '../hooks/useIntersect'

export default function BoardMainPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get(SEARCH_PARAMS.KEYWORD)?.trim() ?? ''
  const {
    data: posts = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    isFetchNextPageError,
  } = usePosts(keyword)

  const sentinelRef = useIntersect<HTMLDivElement>({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage && !isFetchNextPageError,
  })

  const handleSearch = (nextKeyword: string) => {
    setSearchParams(nextKeyword ? { [SEARCH_PARAMS.KEYWORD]: nextKeyword } : {})
  }

  const renderList = () => {
    if (isPending) return <Status>불러오는 중...</Status>
    if (isError && posts.length === 0) return <Status>게시글을 불러오지 못했습니다</Status>
    if (posts.length === 0) {
      return (
        <Status>
          {keyword ? '검색 결과가 없습니다' : '게시글이 없습니다'}
        </Status>
      )
    }

    return (
      <PostList>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </PostList>
    )
  }

  return (
    <Wrapper>
      <Title>게시글 목록</Title>
      <SearchBar keyword={keyword} onSearch={handleSearch} />

      {renderList()}

      <div ref={sentinelRef} />
      {isFetchingNextPage && <Status>더 불러오는 중...</Status>}
      {isFetchNextPageError && (
        <Retry>
          <p>다음 게시글을 불러오지 못했습니다</p>
          <OutlineButton type="button" onClick={() => fetchNextPage()}>
            다시 시도
          </OutlineButton>
        </Retry>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
`

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
`

const Status = styled.p`
  padding: 64px 0;
  text-align: center;
  opacity: 0.6;
`

const Retry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
`
