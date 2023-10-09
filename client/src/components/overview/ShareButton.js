import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Sheet, Tooltip } from '@mui/joy'
import ShareIcon from '@mui/icons-material/Share'
import PuzzleService from '../../services/PuzzleService'
import { useTheme } from '@emotion/react'
import { toast } from 'sonner'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthed } from '../../hooks/useAuthed'
import { convertNumberToEmoji } from '../../common/utils'

const ShareButton = ({ progress, scoreModifiers, puzzleNumber }) => {
  const theme = useTheme()
  const [shareText, setShareText] = React.useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthed()

  React.useEffect(() => {
    async function init() {
      const flatModifiers = scoreModifiers?.reduce((prev, curr) => prev.concat(curr))
      let finalScore = progress.wordScores.filter((score) => score).reduce((prev, curr) => prev + curr, 0)

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
        width: 534,
        height: 112.5,
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
      }}
    >
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid>
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
        {location.pathname === '/casual' && (
          <Grid>
            <Tooltip title="Ranked puzzle scores appear on daily leaderboards and allow you to partake in daily discussions.">
              <Button
                color="primary"
                size="md"
                variant="soft"
                onClick={() => {
                  if (isAuthenticated) navigate('/')
                  else navigate('/login')
                }}
              >
                {isAuthenticated ? 'Complete' : 'Login to Complete'} Todays Ranked Puzzle
              </Button>
            </Tooltip>
          </Grid>
        )}
        {location.pathname === '/' && (
          <Grid>
            <Button
              color="primary"
              size="md"
              variant="soft"
              onClick={() => {
                navigate('/casual')
              }}
            >
              Complete Todays Casual Puzzle
            </Button>
          </Grid>
        )}
      </Grid>
    </Sheet>
  )
}

ShareButton.propTypes = {}

export default ShareButton
