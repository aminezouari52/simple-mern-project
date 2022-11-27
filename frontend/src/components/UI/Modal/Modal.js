import React from 'react'
import Button from '../Button/Button'

import './Modal.css'

const Modal = (props) => {
  const confirmHandler = () => {
    props.confirmDelete()
    console.log('confirmed!')
    console.log('place deleted successfully!')
    props.removeModal()
  }

  const denyHandler = () => {
    props.removeModal()
  }

  return (
    <div className="modal">
      <div className="overlay">im overlay</div>
      <div className="confirm">
        <p>Are you sure you want to delete this place?</p>
        <Button type="button" onClick={confirmHandler}>
          Confirm
        </Button>
        <Button type="button" onClick={denyHandler}>
          NO
        </Button>
      </div>
    </div>
  )
}

export default Modal
