import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material'
import MapModal from '../../shared/components/Modals/MapModal'
import DeleteModal from '../../shared/components/Modals/DeleteModal'

const UserPlaceItem = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const loggedIn = useSelector((state) => state.value)

  // edit page
  const navigate = useNavigate()
  const editHandler = () => {
    navigate(`/places/${props.id}`)
  }

  const params = useParams()
  const userId = params.userId

  // modal state
  const showModalHandler = () => {
    setShowModal((prevState) => !prevState)
  }
  const closeModalHandler = () => {
    setShowModal(false)
  }
  const showDeleteModalHandler = () => {
    setShowDeleteModal((prevState) => !prevState)
  }
  const closeDeleteModalHandler = () => {
    setShowDeleteModal(false)
  }

  // const confirmDeleteHandler = async () => {
  //   await axios.delete('http://localhost:5000/api/places/')

  //   users[userId].place.splice(props.id, 1)

  //   for (let i = props.id; i < users[userId].place.length; i++) {
  //     users[userId].place[i].id--
  //   }
  // }

  return (
    <Card sx={{ maxWidth: 850, m: 6 }}>
      <MapModal
        open={showModal}
        close={closeModalHandler}
        title={props.title}
        cord={props.coordinates}
      />
      <DeleteModal open={showDeleteModal} close={closeDeleteModalHandler} />

      <CardMedia sx={{ height: 450 }} image={props.image} title={props.title} />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {props.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {props.coordinates}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>

      {loggedIn && (
        <CardActions>
          <Button variant="outlined" onClick={showModalHandler}>
            View on Map
          </Button>
          <Button variant="outlined" onClick={editHandler} color="secondary">
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={showDeleteModalHandler}
            color="error"
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default UserPlaceItem
