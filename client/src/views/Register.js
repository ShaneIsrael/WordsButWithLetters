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
import validator from 'email-validator'
import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import logoLight from '../assets/logo-light.png'
import logo from '../assets/logo.png'
import { sleep } from '../common/utils'
import Appbar from '../components/appbar/Appbar'
import AuthService from '../services/AuthService'

const Register = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [email, setEmail] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confPassword, setConfPassword] = React.useState('')
  const [errors, setErrors] = React.useState({
    password: false,
    confirmPassword: false,
    email: false,
  })
  const [message, setMessage] = React.useState('')

  const handlePasswordChange = (e) => {
    if (errors.password) setErrors((prev) => ({ ...prev, password: false }))

    setPassword(e.target.value)
    if (!e.target.value || e.target.value.length <= 5) return setErrors((prev) => ({ ...prev, password: true }))
  }

  const handleConfPasswordChange = (e) => {
    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: false }))

    setConfPassword(e.target.value)
    if (!e.target.value || e.target.value !== password) return setErrors((prev) => ({ ...prev, confirmPassword: true }))
  }

  const handleEmailChange = (e) => {
    if (errors.email) setErrors((prev) => ({ ...prev, email: false }))

    setEmail(e.target.value)
    if (!e.target.value || !validator.validate(e.target.value)) return setErrors((prev) => ({ ...prev, email: true }))
  }

  const handleDisplayNameChange = (e) => {
    if (errors.displayName) setErrors((prev) => ({ ...prev, displayName: false }))

    setDisplayName(e.target.value)
    if (!e.target.value || e.target.value.length < 5) return setErrors((prev) => ({ ...prev, displayName: true }))
  }

  const handleRegister = async () => {
    try {
      const resp = (await AuthService.register(email, password, displayName)).data
      toast.success(resp, {
        duration: 5000,
      })
      await sleep(7500)
      navigate('/login')
    } catch (err) {
      if (err.response?.data) {
        setMessage(err.response.data)
      }
    }
  }

  return (
    <Appbar hideLoginLogout>
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
            mt: 0.5,
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
              <b>Register</b>
            </Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              onChange={handleEmailChange}
              error={errors.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Display name</FormLabel>
            <Input
              value={displayName}
              name="displayName"
              type="text"
              placeholder="AwesomeSauce"
              onChange={handleDisplayNameChange}
              error={errors.displayName}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              name="password"
              type="password"
              placeholder="password"
              onChange={handlePasswordChange}
              error={errors.password}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm password</FormLabel>
            <Input
              value={confPassword}
              name="password"
              type="password"
              placeholder="confirm password"
              onChange={handleConfPasswordChange}
              disabled={!password || password.length <= 5}
              error={errors.confirmPassword}
            />
          </FormControl>

          <Button
            sx={{ mt: 1 /* margin top */ }}
            onClick={handleRegister}
            disabled={
              !password ||
              !confPassword ||
              confPassword !== password ||
              errors.password ||
              errors.confirmPassword ||
              errors.email
            }
          >
            Register
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
          <Typography endDecorator={<Link href="/#/login">Login</Link>} fontSize="sm" sx={{ alignSelf: 'center' }}>
            Already have an account?
          </Typography>
        </Sheet>
      </Box>
    </Appbar>
  )
}

Register.propTypes = {}

export default Register
