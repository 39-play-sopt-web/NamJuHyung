import { useState } from 'react'

interface ModalState {
  message: string
  onClose?: () => void
  onConfirm?: () => void
}

export const useModal = () => {
  const [modal, setModal] = useState<ModalState | null>(null)

  const openModal = (state: ModalState) => setModal(state)

  const closeModal = () => {
    modal?.onClose?.()
    setModal(null)
  }

  const modalProps = {
    isOpen: modal !== null,
    onClose: closeModal,
    onConfirm: modal?.onConfirm,
    children: modal?.message,
  }

  return { openModal, closeModal, modalProps }
}
