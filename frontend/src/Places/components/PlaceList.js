import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Paper, Button, Typography } from '@mui/material'
import PlaceItem from './PlaceItem'

const PlaceList = (props) => {
  const navigate = useNavigate()

  if (props.items.length === 0)
    return (
      <Paper
        sx={{
          maxWidth: 440,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          No Places Found. Maybe Create One?
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate('/places/new')}
        >
          Share Place
        </Button>
      </Paper>
    )

  return (
    <div style={{ flexDirection: 'column' }}>
      {props.items.map((place) => (
        <PlaceItem
          key={place._id}
          id={place._id}
          image={place.image}
          title={place.title}
          description={place.description}
          adress={place.adress}
          creatorId={place.creatorId}
          coordinates={place.coordinates}
        />
      ))}
    </div>
  )
}

export default PlaceList
