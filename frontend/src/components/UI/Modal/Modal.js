import React from 'react'
import Button from '../Button/Button'

import './Modal.css'

const Modal = (props) => {
  const confirmDeleteHandler = () => {
    props.confirmDelete()
    console.log('place deleted successfully!')
    props.removeModal()
  }

  const removeModalHandler = () => {
    props.removeModal()
  }

  return (
    <div className="modal">
      <div className="overlay">im overlay</div>
      <div className="confirm">
        <p>Are you sure you want to delete this place?</p>
        <Button type="button" onClick={confirmDeleteHandler}>
          Confirm
        </Button>
        <Button type="button" onClick={removeModalHandler}>
          NO
        </Button>
      </div>
    </div>
  )
}

export default Modal
