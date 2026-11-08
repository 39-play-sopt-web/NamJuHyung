import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import styled from '@emotion/styled'
import { OutlineButton } from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  confirmText?: string
  onConfirm?: () => void
  cancelText?: string
  isPending?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  children,
  confirmText = '확인',
  onConfirm,
  cancelText = '취소',
  isPending = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleCancel = () => {
    if (!isPending) onClose()
  }
  const handleConfirm = () => {
    if (isPending) return
    if (onConfirm) onConfirm()
    else onClose()
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  return (
    <Dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(event) => {
        if (isPending) event.preventDefault()
      }}
    >
      <Message>{children}</Message>
      <Actions>
        {onConfirm && (
          <CancelButton
            type="button"
            onClick={handleCancel}
            disabled={isPending}
          >
            {cancelText}
          </CancelButton>
        )}
        <ConfirmButton
          type="button"
          onClick={handleConfirm}
          disabled={isPending}
          autoFocus
        >
          {isPending ? '처리 중...' : confirmText}
        </ConfirmButton>
      </Actions>
    </Dialog>
  )
}

const Dialog = styled.dialog`
  width: calc(100% - 48px);
  max-width: 360px;
  margin: auto;
  padding: 32px 24px 24px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &[open] {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &::backdrop {
    background: rgba(0, 0, 0, 0.6);
  }
`

const Message = styled.p`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.5;
  white-space: pre-line;
`

const Actions = styled.div`
  display: flex;
  gap: 8px;
`

const CancelButton = styled(OutlineButton)`
  flex: 1;
`

const ConfirmButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }
`
