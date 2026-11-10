import { Outlet, useNavigate } from 'react-router-dom'
import Modal from '../common/Modal'
import { MODAL_MESSAGES } from '../../constants/messages'
import { ROUTES } from '../../constants/routes'
import { hasAuth } from '../../utils/auth'

export default function RequireAuth() {
  const navigate = useNavigate()

  if (hasAuth()) return <Outlet />

  return (
    <Modal
      isOpen
      onClose={() => navigate(ROUTES.HOME, { replace: true, flushSync: true })}
    >
      {MODAL_MESSAGES.AUTH_REQUIRED}
    </Modal>
  )
}
