import React from 'react'

import UserItem from './UserItem'
import './UserList.css'

const UserList = (props) => {
  let content
  if (!props.items || props.items.length === 0) {
    content = <p>Could not find any users. Maybe create one?</p>
  } else {
    content = (
      <ul className="user-list">
        {props.items.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            age={user.age}
          />
        ))}
      </ul>
    )
  }

  return <section id="users">{content}</section>
}

export default UserList
