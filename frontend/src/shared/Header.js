import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { logActions } from './store'

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
  Link,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.value)
  const userId = useSelector((state) => state.id)

  const navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    const { pathname } = location
    if (pathname === '/') setActiveIndex(0)
    else if (pathname.match(/\/[a-zA-Z0-9:]+\/places/)) setActiveIndex(1)
    else if (pathname === '/places/new') setActiveIndex(2)
    else setActiveIndex(3)
  }, [location])

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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link
              component={NavLink}
              color={activeIndex === 0 ? 'yellow' : '#000'}
              underline="none"
              to="/"
            >
              <ListItemText primary="ALL USERS" />
            </Link>
          </ListItemButton>
        </ListItem>
        {loggedIn && (
          <>
            <ListItem key="MY PLACES" disablePadding>
              <ListItemButton
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Link
                  component={NavLink}
                  color={activeIndex === 1 ? 'yellow' : '#000'}
                  underline="none"
                  to={`/${userId}/places`}
                >
                  <ListItemText primary="MY PLACES" />
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem key="ADD PLACE" disablePadding>
              <ListItemButton
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Link
                  component={NavLink}
                  color={activeIndex === 2 ? 'yellow' : '#000'}
                  underline="none"
                  to="/places/new"
                >
                  <ListItemText primary="ADD PLACE" />
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItemButton
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={logoutHandler}
            >
              LOGOUT
            </ListItemButton>
          </>
        )}
        {!loggedIn && (
          <ListItem key="AUTHENTICATE" disablePadding>
            <ListItemButton
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link
                component={NavLink}
                color={activeIndex === 3 ? 'yellow' : '#000'}
                underline="none"
                to="/auth/signin"
              >
                <ListItemText primary="AUTHENTICATE" />
              </Link>
            </ListItemButton>
          </ListItem>
        )}
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
              <Link
                sx={{ mr: 2 }}
                variant="button"
                component={NavLink}
                color={activeIndex === 0 ? 'yellow' : '#fff'}
                underline="none"
                to="/"
              >
                ALL USERS
              </Link>
              {loggedIn && (
                <>
                  <Link
                    sx={{ mr: 2 }}
                    variant="button"
                    component={NavLink}
                    color={activeIndex === 1 ? 'yellow' : '#fff'}
                    underline="none"
                    to={`/${userId}/places`}
                  >
                    MY PLACES
                  </Link>
                  <Link
                    sx={{ mr: 2 }}
                    variant="button"
                    component={NavLink}
                    color={activeIndex === 2 ? 'yellow' : '#fff'}
                    underline="none"
                    to="/places/new"
                  >
                    ADD PLACE
                  </Link>
                  <Button
                    sx={{ mr: 2 }}
                    variant="outline"
                    color="error"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </>
              )}
              {!loggedIn && (
                <Link
                  sx={{ mr: 2 }}
                  variant="button"
                  component={NavLink}
                  color={activeIndex === 3 ? 'yellow' : '#fff'}
                  underline="none"
                  to="auth/signin"
                >
                  AUTHENTICATE
                </Link>
              )}
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
    </header>
  )
}

export default Header
