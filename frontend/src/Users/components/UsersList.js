import React from 'react'

import UserItem from './UserItem'
import './UsersList.css'

const UserList = (props) => {
  let content

  content = (
    <ul className="user-list">
      {props.items.map((user) => (
        <UserItem
          key={user._id}
          id={user._id}
          name={user.name}
          age={user.age}
          places={user.places}
        />
      ))}
    </ul>
  )

  return <section id="users">{content}</section>
}

export default UserList
