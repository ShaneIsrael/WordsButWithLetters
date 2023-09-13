import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, FormControl, FormLabel, IconButton, Input, Link, Sheet, Typography } from '@mui/joy'
import ErrorIcon from '@mui/icons-material/Error'
import CloseIcon from '@mui/icons-material/Close'

import AuthService from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await AuthService.login(email, password)
      navigate('/')
    } catch (err) {
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
    <Sheet
      sx={{
        width: 350,
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
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
        <Typography level="body2">Login to continue.</Typography>
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
      <Typography endDecorator={<Link href="/#/register">Register</Link>} fontSize="sm" sx={{ alignSelf: 'center' }}>
        Don&apos;t have an account?
      </Typography>
    </Sheet>
  )
}

Login.propTypes = {}

export default Login
