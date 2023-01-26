import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { logActions } from '../store/store'

import {
  Button,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.value)
  const navigate = useNavigate()

  let location = useLocation()

  useEffect(() => {
    const { pathname } = location
    if (pathname === '/') setActiveIndex(0)
    else if (pathname.match(/\/[a-zA-Z0-9:]+\/places/)) setActiveIndex(1)
    else if (pathname === '/places/new') setActiveIndex(2)
    else setActiveIndex(3)
  }, [location])

  const allUsersRoute = () => {
    navigate('/')
  }
  const myPlacesRoute = () => {
    navigate('/:userId/places')
  }

  const addPlaceRoute = () => {
    navigate('/places/new')
  }

  const authenticateRoute = () => {
    navigate('/auth')
  }

  const logoutHandler = () => {
    dispatch(logActions.logOut())
    navigate('/')
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }
  const [activeIndex, setActiveIndex] = useState(0)

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MyPlaces
      </Typography>
      <Divider />
      <List>
        <ListItem key="All USERS" disablePadding>
          <ListItemButton
            sx={{
              textAlign: 'center',
              color: activeIndex === 0 ? 'yellow' : '#000',
            }}
            onClick={allUsersRoute}
          >
            <ListItemText primary="ALL USERS" />
          </ListItemButton>
        </ListItem>

        <ListItem key="MY PLACES" disablePadding>
          <ListItemButton
            sx={{
              textAlign: 'center',
              color: activeIndex === 1 ? 'yellow' : '#000',
            }}
            onClick={myPlacesRoute}
          >
            <ListItemText primary="MY PLACES" />
          </ListItemButton>
        </ListItem>

        <ListItem key="ADD PLACE" disablePadding>
          <ListItemButton
            sx={{
              textAlign: 'center',
              color: activeIndex === 2 ? 'yellow' : '#000',
            }}
            onClick={addPlaceRoute}
          >
            <ListItemText primary="ADD PLACE" />
          </ListItemButton>
        </ListItem>

        <ListItem key="AUTHENTICATE" disablePadding>
          <ListItemButton
            sx={{
              textAlign: 'center',
              color: activeIndex === 3 ? 'yellow' : '#000',
            }}
            onClick={authenticateRoute}
          >
            <ListItemText primary="AUTHENTICATE" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
  return (
    <header>
      <Box sx={{ display: 'flex' }}>
        {/* <CssBaseline /> */}
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              YourPlaces
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button
                key="ALL USERS"
                sx={{ color: activeIndex === 0 ? 'yellow' : '#fff' }}
                onClick={allUsersRoute}
              >
                ALL USERS
              </Button>
              <Button
                key="MY PLACES"
                sx={{ color: activeIndex === 1 ? 'yellow' : '#fff' }}
                onClick={myPlacesRoute}
              >
                MY PLACES
              </Button>
              <Button
                key="ADD PLACE"
                sx={{ color: activeIndex === 2 ? 'yellow' : '#fff' }}
                onClick={addPlaceRoute}
              >
                ADD PLACE
              </Button>
              <Button
                key="AUTHENICATE"
                sx={{ color: activeIndex === 3 ? 'yellow' : '#fff' }}
                onClick={authenticateRoute}
              >
                AUTHENICATE
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 240,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      {/*
      <div className="nav">
        <NavLink to="/">Users</NavLink>
        {loggedIn && (
          <>
            <NavLink to="places/new">New</NavLink>
            <Button variant="outlined" onClick={logoutHandler}>
              Log Out
            </Button>
          </>
        )}
        {!loggedIn && <NavLink to="auth">Authenticate</NavLink>}
      </div> */}
    </header>
  )
}

export default Header
