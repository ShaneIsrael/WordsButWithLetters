import { useTheme } from '@emotion/react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Grid, IconButton, List, ListItem, Typography } from '@mui/joy'
import React, { useEffect } from 'react'
import Appbar from '../components/appbar/Appbar'
import FeedbackService from '../services/FeedbackService'

const Token = ({ sx, children }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        borderRadius: 1,
        background: theme.palette.primary[600],
        padding: '4px 8px',
        width: 'fit-content',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

function Admin() {
  const [feedback, setFeedback] = React.useState([])
  const [selected, setSelected] = React.useState()
  const theme = useTheme()

  const darkMode = theme.palette.mode === 'dark'
  const backgroundColor = darkMode ? 'primary.900' : 'primary.300'
  const borderColor = darkMode ? 'white' : 'black'

  const fetchFeedback = async () => {
    try {
      const feedbackData = (await FeedbackService.getAllFeedback()).data
      setFeedback(feedbackData)
      setSelected(feedbackData[0])
    } catch (err) {
      console.log('Error retrieving feedback')
      console.log(err)
    }
  }

  useEffect(() => {
    fetchFeedback()
  }, [])

  const archiveFeedback = async () => {
    try {
      await FeedbackService.dismissFeedback(selected.id)
      fetchFeedback()
    } catch (err) {
      console.log('Error dismissing message')
      console.log(err)
    }
  }

  const getDate = (val) => {
    const date = new Date(Date.parse(val))
    return date.toLocaleString()
  }

  return (
    <>
      <Appbar hideInstructions />
      <Box
        sx={{
          height: 'calc(100vh - 70px)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container sx={{ width: 1200, height: 800, borderRadius: 8, border: `2px solid ${borderColor}` }}>
          <Grid
            xs={3}
            sx={{
              borderRight: `2px solid ${borderColor}`,
              height: '100%',
              overflow: 'auto',
              padding: '8px 4px',
              background: theme.palette.mode === 'dark' ? '#0B0D0E' : theme.palette.neutral[100],
              borderRadius: '8px 0 0 8px',
            }}
          >
            <List>
              {feedback.map((f, i) => {
                const date = getDate(f.createdAt)
                const selectedValue = f.id === selected.id
                return (
                  <ListItem
                    key={`li-${i}`}
                    sx={{
                      border: '2px solid',
                      borderColor: selectedValue ? theme.palette.primary[600] : '#616161',
                      borderRadius: 4,
                      margin: '2px 4px',
                      background: selectedValue ? '#051423' : '',
                      color: selectedValue ? 'white' : '',
                      ':hover': {
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => setSelected(f)}
                  >
                    {date}
                  </ListItem>
                )
              })}
            </List>
          </Grid>
          <Grid xs={9} sx={{ position: 'relative' }}>
            <Box sx={{ m: 1 }}>
              <Token sx={{ mb: 2, width: '100%', textAlign: 'center' }}>
                <Typography level="h2" sx={{ fontWeight: 500, fontSize: 32, color: 'white' }}>
                  Feedback
                </Typography>
              </Token>
              <Box sx={{ m: 1 }}>{selected?.body}</Box>
            </Box>

            <IconButton
              size="large"
              onClick={archiveFeedback}
              sx={{
                position: 'absolute',
                right: 20,
                bottom: 20,
                background: theme.palette.primary[600],
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
            >
              <DeleteIcon sx={{ color: 'white' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Admin
