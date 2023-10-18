import { useTheme } from '@emotion/react'
import ShareIcon from '@mui/icons-material/Share'
import { Button, Grid, Sheet, Tooltip } from '@mui/joy'
import PropTypes from 'prop-types'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { convertNumberToEmoji } from '../../common/utils'
import { useAuthed } from '../../hooks/useAuthed'
import PuzzleService from '../../services/PuzzleService'
import FeedbackModal from '../modals/FeedbackModal'

const ShareButton = ({ progress, scoreModifiers, puzzleNumber }) => {
  const theme = useTheme()
  const [shareText, setShareText] = React.useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthed()
  const [feedbackModalOpen, setFeedbackModalOpen] = React.useState(false)

  React.useEffect(() => {
    async function init() {
      const flatModifiers = scoreModifiers?.reduce((prev, curr) => prev.concat(curr))
      const finalScore = progress.wordScores.filter((score) => score).reduce((prev, curr) => prev + curr, 0)

      let shareText = `WBWL -- #${puzzleNumber}\n\n`

      progress.wordMatrix.forEach((word) => {
        word.forEach((l) => {
          if (!l) {
            shareText += '⬛'
          } else if (flatModifiers?.includes(l)) {
            shareText += '🟨'
          } else {
            shareText += '🟦'
          }
        })

        shareText += '\n'
      })

      shareText += '➖➖➖➖➖\n'
      if (progress.bonusWordFound) {
        const bword = progress.bonusWordFound.split('')
        shareText += ` ${bword[0]}   ${bword[1]}   ${bword[2]}   ${bword[3]}   ${bword[4]}\n`

        // let bonusWordScore = convertNumberToEmoji(progress.wordScores.slice(-1))
      } else {
        shareText += '❌❌❌❌❌\n'
      }
      shareText += '➖➖➖➖➖\n'
      shareText += convertNumberToEmoji(finalScore)
      setShareText(shareText)
    }
    init()
  }, [progress, scoreModifiers, puzzleNumber])

  return (
    <Sheet
      variant="plain"
      sx={{
        width: { xs: 350, md: 534 },
        height: { xs: 89, md: 222 },
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FeedbackModal open={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
      <Grid container justifyContent="center" alignItems="center" gap={{ xs: 0.5, md: 1 }}>
        <Grid container justifyContent="center" md={12}>
          <Button
            color="success"
            size="md"
            variant="soft"
            endDecorator={<ShareIcon />}
            onClick={() => {
              umami.track('Share button')
              navigator.clipboard.writeText(shareText)
              toast.success('Copied to clipboard!')
            }}
          >
            Share
          </Button>
        </Grid>
        <Grid container justifyContent="center" md={12}>
          <Tooltip title="Give us some feedback.">
            <Button
              sx={{ background: '#014CC273' }}
              size="md"
              variant="soft"
              onClick={() => setFeedbackModalOpen(true)}
            >
              Leave Feedback
            </Button>
          </Tooltip>
        </Grid>
        {location.pathname === '/casual' && (
          <Grid container justifyContent="center" md={12}>
            <Tooltip title="Ranked puzzle scores appear on daily leaderboards and allow you to partake in daily discussions.">
              <Button
                color="primary"
                size="md"
                variant="soft"
                onClick={() => {
                  if (isAuthenticated) navigate('/ranked')
                  else navigate('/login')
                }}
              >
                {isAuthenticated ? 'Complete' : 'Login for'} Today's Ranked Puzzle
              </Button>
            </Tooltip>
          </Grid>
        )}
        {location.pathname === '/' && (
          <Grid container justifyContent="center" md={12}>
            <Button
              color="primary"
              size="md"
              variant="soft"
              onClick={() => {
                navigate('/leaderboard')
              }}
            >
              View Leaderboard
            </Button>
          </Grid>
        )}
      </Grid>
    </Sheet>
  )
}

ShareButton.propTypes = {}

export default ShareButton
