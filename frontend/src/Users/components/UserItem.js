import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Avatar, Card, Typography } from '@mui/material'

const UserItem = (props) => {
  const navigate = useNavigate()
  const getPlaces = () => {
    navigate(`/${props.id}/places`)
  }

  return (
    <li>
      <Card
        sx={{
          m: 5,
          p: 5,
          minWidth: 430,
          display: 'flex',
          cursor: 'pointer',
          '&:hover': { bgcolor: 'yellow' },
        }}
        onClick={getPlaces}
      >
        <Avatar
          alt="Amine Zouari"
          src={props.image}
          sx={{ width: 76, height: 76, mr: 5 }}
        />
        <div>
          <Typography variant="h4">{props.name}</Typography>
          <Typography variant="h5" fontWeight="bold">
            {props.placeCount}
            {props.placeCount === 1 ? ' Place' : ' Places'}
          </Typography>
        </div>
      </Card>
    </li>
  )
}

export default UserItem
