import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Sheet, styled } from '@mui/joy'
import BackspaceIcon from '@mui/icons-material/Backspace'
import { useTheme } from '@emotion/react'
import wrongSfx from '../../sounds/wrong.wav'
import useSound from 'use-sound'
import clsx from 'clsx'

const KeyButton = styled(Button)(({ theme, highlight }) => ({
  backgroundColor: highlight ? '#EACB4F59' : false,
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  borderColor: highlight ? theme.palette.warning[200] : false,
  // border: '1px solid #00000040',
  // color: theme.vars.palette.text.secondary,
  width: 43,
  height: 58,
  fontSize: '1.25em',
  fontWeight: 'bold',
  cursor: 'pointer',
}))

const layout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
]

const VKeyboard = ({ onKeyPressed, onDelete, onEnter, disabledKeys, highlightKeys, disabled }) => {
  const theme = useTheme()

  const [invalidAnimationOn, setInvalidAnimationOn] = React.useState(false)
  const [playInvalid] = useSound(wrongSfx)

  React.useEffect(() => {
    function handleKeyDown(e) {
      if (/^[a-zA-Z]$/.test(e.key)) {
        if (disabledKeys.indexOf(e.key.toUpperCase()) >= 0) {
          playInvalid()
          setInvalidAnimationOn(true)
          setTimeout(() => {
            setInvalidAnimationOn(false)
          }, 500)
        } else {
          return onKeyPressed(e.key.toUpperCase())
        }
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        return onDelete()
      }
      if (e.key === 'Enter') {
        return onEnter()
      }
    }

    if (!disabled) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onKeyPressed, onDelete, onEnter])

  return (
    <Sheet
      variant="plain"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: 2,
        borderRadius: 8,
      }}
    >
      {layout.map((row, index) => (
        <Grid key={`${row[0]}-${index}`} container gap={1} flexWrap="nowrap" justifyContent={'center'}>
          {row.map((key) => (
            <div key={key}>
              {key === 'DELETE' && (
                <KeyButton
                  disabled={disabled}
                  variant="outlined"
                  onClick={onDelete}
                  sx={{ maxWidth: 65.4, width: '100%' }}
                >
                  <BackspaceIcon />
                </KeyButton>
              )}
              {key === 'ENTER' && (
                <KeyButton
                  disabled={disabled}
                  variant="outlined"
                  onClick={onEnter}
                  sx={{ maxWidth: 65.4, width: '100%', fontSize: 12 }}
                >
                  {key}
                </KeyButton>
              )}
              {key !== 'ENTER' && key !== 'DELETE' && (
                <KeyButton
                  disabled={disabledKeys.indexOf(key) >= 0 || disabled}
                  highlight={highlightKeys.indexOf(key) >= 0 ? 1 : 0}
                  color={disabledKeys.indexOf(key) >= 0 ? 'neutral' : 'primary'}
                  className={clsx({ invalid: invalidAnimationOn && disabledKeys.indexOf(key) >= 0 })}
                  variant="outlined"
                  onClick={() => {
                    onKeyPressed(key)
                  }}
                >
                  {key}
                </KeyButton>
              )}
            </div>
          ))}
        </Grid>
      ))}
    </Sheet>
  )
}

VKeyboard.propTypes = {
  onKeyPressed: PropTypes.func,
  onDelete: PropTypes.func,
  onEnter: PropTypes.func,
  disabledKeys: PropTypes.array,
  highlightKeys: PropTypes.array,
}
VKeyboard.defaultProps = {
  onKeyPressed: () => {},
  onDelete: () => {},
  onEnter: () => {},
  disabledKeys: [],
  highlightKeys: [],
}

export default VKeyboard
