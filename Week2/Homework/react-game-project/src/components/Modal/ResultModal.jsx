import { createPortal } from 'react-dom'

function ResultModal({ time, level, onConfirm }) {
  return createPortal(
    <>
      <div className="modal-backdrop show" />
      <div className="modal d-block" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center p-5 gap-4">
            <h2 className="modal-title fs-2">🎉Level {level} 클리어!🎉</h2>
            <p className="fs-3 fw-bold text-primary mb-0">{time.toFixed(2)}초</p>
            <button
              type="button"
              className="btn btn-primary px-5 py-2 align-self-center"
              onClick={onConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}

export default ResultModal
