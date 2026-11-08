export const MODAL_MESSAGES = {
  AUTH_REQUIRED: '코드를 먼저 발급받아주세요.',
  CODE_ISSUED: '코드가 발급되었습니다.',
  ISSUE_FAILED: '코드 발급에 실패했습니다.',
  CREATE_SUCCESS: (author: string) => `${author}님의 게시글이 작성되었습니다.`,
  CREATE_FAILED: '게시글 작성에 실패했습니다.',
  UPDATE_SUCCESS: '게시글이 수정되었습니다.',
  UPDATE_FAILED: '게시글 수정에 실패했습니다.',
  DELETE_CONFIRM: '게시글을 삭제하시겠습니까?',
  DELETE_SUCCESS: '게시글이 삭제되었습니다.',
  DELETE_FAILED: '게시글 삭제에 실패했습니다.',
} as const
