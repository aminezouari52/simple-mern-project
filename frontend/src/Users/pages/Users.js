import React, { useState, useEffect } from 'react'

import { useHttpClient } from '../../shared/http-hook'

import UsersList from '../components/UsersList'

import { Button, Box, Backdrop, CircularProgress } from '@mui/material'

const Users = (props) => {
  const [users, setUsers] = useState([])
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await sendRequest('http://localhost:5000/api/users/')
      setUsers(response.data.data)
    }
    fetchUsers()
  }, [])

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          fontSize: 40,
        }}
        open={Boolean(error)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
          }}
        >
          <Box sx={{ m: 4 }}>{error}</Box>
          <Button
            variant="contained"
            color="error"
            sx={{ width: 160 }}
            onClick={() => clearError()}
          >
            close
          </Button>
        </Box>
      </Backdrop>
      <UsersList items={users} />
    </>
  )
}

export default Users
