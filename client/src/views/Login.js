import CloseIcon from '@mui/icons-material/Close'
import ErrorIcon from '@mui/icons-material/Error'
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link,
  Sheet,
  Typography,
  useTheme,
} from '@mui/joy'
import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import logoLight from '../assets/logo-light.png'
import logo from '../assets/logo.png'
import Appbar from '../components/appbar/Appbar'
import { useAuth } from '../hooks/useAuth'

const Login = (props) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  const { login } = useAuth()
  const theme = useTheme()

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await login(email, password)
      umami.track('Login succeeded')
      navigate('/')
    } catch (err) {
      umami.track('Login failed')
      if (err.response?.data) {
        setMessage(err.response.data)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (email && password) {
        handleLogin()
      }
    }
  }
  return (
    <>
      <Appbar hideLoginLogout hideTitle />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)',
        }}
      >
        <img src={theme.palette.mode === 'dark' ? logo : logoLight} width={345} alt="logo" />
        <Sheet
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 350,
            my: 0.5,
            py: 3,
            px: 2,
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} disabled={!email || !password} onClick={handleLogin}>
            Login
          </Button>
          {message && (
            <Alert
              variant="solid"
              color="danger"
              startDecorator={<ErrorIcon />}
              endDecorator={
                <IconButton variant="solid" size="sm" color="danger" onClick={() => setMessage(null)}>
                  <CloseIcon />
                </IconButton>
              }
            >
              {message}
            </Alert>
          )}
          <Typography
            endDecorator={<Link href="/#/register">Register</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </Box>
    </>
  )
}

Login.propTypes = {}

export default Login
