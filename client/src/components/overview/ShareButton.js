import React from 'react'
import PropTypes from 'prop-types'
import { Button, Sheet } from '@mui/joy'
import ShareIcon from '@mui/icons-material/Share'
import PuzzleService from '../../services/PuzzleService'
import { useTheme } from '@emotion/react'
import { toast } from 'sonner'

const EMOJI_NUMBER_MAP = {
  0: '0️⃣',
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
  6: '6️⃣',
  7: '7️⃣',
  8: '8️⃣',
  9: '9️⃣',
}

function convertNumberToEmoji(number) {
  let tempNumber = `${number}`
  const numberSize = tempNumber.length
  if (numberSize < 5) {
    for (let i = 0; i < 5 - numberSize; i++) {
      tempNumber = '0' + tempNumber
    }
  }
  tempNumber = `${tempNumber.split('').reduce((prev, curr) => prev + EMOJI_NUMBER_MAP[curr], '')}\n`
  return tempNumber
}

const ShareButton = ({ progress, scoreModifiers, puzzleNumber }) => {
  const theme = useTheme()
  const [shareText, setShareText] = React.useState('')

  React.useEffect(() => {
    async function init() {
      const flatModifiers = scoreModifiers.reduce((prev, curr) => prev.concat(curr))
      let finalScore = progress.wordScores.filter((score) => score).reduce((prev, curr) => prev + curr, 0)

      let shareText = `WBWL -- #${puzzleNumber}\n\n`

      progress.wordMatrix.forEach((word) => {
        word.forEach((l) => {
          if (!l) {
            shareText += '⬛'
          } else if (flatModifiers.includes(l)) {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 534,
        height: 112.5,
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
      }}
    >
      <Button
        color="success"
        size="lg"
        variant="solid"
        endDecorator={<ShareIcon />}
        onClick={() => {
          navigator.clipboard.writeText(shareText)
          toast.success('Copied to clipboard!')
        }}
      >
        Share
      </Button>
    </Sheet>
  )
}

ShareButton.propTypes = {}

export default ShareButton
