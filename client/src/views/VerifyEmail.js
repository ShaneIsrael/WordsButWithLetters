import React from 'react'
import { Grid, Sheet, Typography } from '@mui/joy'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import _ from 'lodash'
import AuthService from '../services/AuthService'
import { sleep } from '../common/utils'

const VerifyEmail = (props) => {
  const { email, token } = useParams()
  const [verifiedMessage, setVerifiedMessage] = React.useState()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function verify() {
        await sleep(2000)
        try {
            await AuthService.verify(email, token)
            setVerifiedMessage('Your account has been verified, redirecting...')
            sleep(2500).then(() => {
                navigate('/login')
            })
        } catch (err) {
            setVerifiedMessage('Unable to verify, please check your verification link and try again.')
        }
    }
    verify()
  }, [email, token])


  return (
    <Sheet
    sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    }}
    variant="outlined"
    >
        <Grid container justifyContent="center" spacing={2}>
        <Grid xs={12}><Typography level="h2" textAlign='center'>Verifying your account...</Typography></Grid>
    {verifiedMessage &&   <Grid xs={12}><Typography level="h3" textAlign='center' sx={{fontFamily: 'Bubblegum Sans'}}>{verifiedMessage}</Typography></Grid>}
        </Grid>
    </Sheet>
  )
}

VerifyEmail.propTypes = {}

export default VerifyEmail
