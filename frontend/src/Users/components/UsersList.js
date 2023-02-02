import React from 'react'

import UserItem from './UserItem'
import { Card } from '@mui/material'

const UsersList = (props) => {
  let content

  if (props.items?.length === 0)
    content = (
      <Card sx={{ textAlign: 'center', padding: 5 }}>No Users Found</Card>
    )
  else
    content = (
      <ul style={{ listStyle: 'none' }}>
        {props.items.map((user) => (
          <UserItem
            key={user._id}
            id={user._id}
            name={user.name}
            image={user.image}
            placeCount={user.places.length}
          />
        ))}
      </ul>
    )

  return <>{content}</>
}

export default UsersList
