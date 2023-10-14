import { useTheme } from '@emotion/react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Grid, IconButton, List, ListItem } from '@mui/joy'
import React, { useEffect } from 'react'
import Appbar from '../components/appbar/Appbar'
import FeedbackService from '../services/FeedbackService'

function Admin() {
  const [feedback, setFeedback] = React.useState([])
  const [selected, setSelected] = React.useState()
  const theme = useTheme()

  const darkMode = theme.palette.mode === 'dark'
  const backgroundColor = darkMode ? 'primary.900' : 'primary.300'

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

  return (
    <Appbar hideInstructions>
      <Box
        sx={{
          height: 'calc(100vh - 70px)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          sx={{ width: 1200, height: 800, borderRadius: 8, border: `1px solid ${theme.palette.neutral[100]}` }}
        >
          <Grid
            xs={3}
            sx={{
              borderRight: '1px solid white',
              height: '100%',
              overflow: 'auto',
              padding: '8px 4px',
              background: theme.palette.mode === 'dark' ? '#0B0D0E' : theme.palette.neutral[100],
              borderRadius: '8px 0 0 8px',
            }}
          >
            <List>
              {feedback.map((f, i) => {
                const date = new Date(Date.parse(f.createdAt))
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
                      ':hover': {
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => setSelected(f)}
                  >
                    {date.toLocaleString()}
                  </ListItem>
                )
              })}
            </List>
          </Grid>
          <Grid xs={9} sx={{ position: 'relative' }}>
            <Box sx={{ margin: 4 }}>{selected?.body}</Box>
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
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Appbar>
  )
}

export default Admin
