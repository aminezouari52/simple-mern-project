import React from 'react'

import './UserItem.css'

const UserItem = (props) => {
  return (
    <li className="user-item">
      <h5>id: {props.id}</h5>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
    </li>
  )
}

export default UserItem
