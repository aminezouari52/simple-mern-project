import React from 'react'

import './UserPlaceItem.css'
import Button from '../UI/Button/Button'

const UserPlaceItem = (props) => {
  return (
    <div className="container" key={props.keyProp}>
      <div>img placeholder</div>
      <h3>Title: {props.title} </h3>
      <div>
        <Button type="button">Edit</Button>
        <Button type="button">Delete</Button>
      </div>
    </div>
  )
}

export default UserPlaceItem
