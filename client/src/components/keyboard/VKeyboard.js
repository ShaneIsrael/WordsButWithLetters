import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, Sheet, styled } from '@mui/joy'
import BackspaceIcon from '@mui/icons-material/Backspace'
import { useTheme } from '@emotion/react'
import clsx from 'clsx'

const KeyButton = styled(Button)(({ theme, highlight }) => ({
  backgroundColor: highlight ? '#EACB4F59' : false,
  ...theme.typography['body-sm'],
  borderRadius: 0,
  borderColor: highlight ? theme.palette.warning[200] : false,
  width: 43,
  height: 58,
  fontSize: '1.25em',
  fontWeight: 'bold',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.5,
  },
  '&.Mui-disabled': {
    border: theme.palette.mode === 'light' && '1px solid lightGrey',
  },
}))

const layout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
]

const VKeyboard = ({
  onKeyPressed,
  onDelete,
  onEnter,
  onInvalidKey,
  disabledKeys,
  highlightKeys,
  keyboardEnabled,
  invalidAnimationOn,
}) => {
  const theme = useTheme()

  const [disabled, setDisabled] = React.useState(!keyboardEnabled)

  React.useEffect(() => {
    setDisabled(!keyboardEnabled)
  }, [keyboardEnabled])

  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.id === 'feedbackTextarea') {
        return
      }

      if (e.target.id === 'tutorialButton') {
        e.target.blur()
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        return onDelete()
      } else if (e.key === 'Enter') {
        return onEnter()
      } else {
        if (/^[a-zA-Z]$/.test(e.key)) {
          if (disabledKeys.indexOf(e.key.toUpperCase()) >= 0) {
            onInvalidKey()
          } else {
            return onKeyPressed(e.key.toUpperCase())
          }
        }
      }
    }

    if (!disabled) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onKeyPressed, onDelete, onEnter, onInvalidKey, disabled, disabledKeys])

  const getPrimaryButton = (key, functionKey, onClick, disabled, sx) => {
    const keyDisabled = (!functionKey && disabledKeys.indexOf(key) >= 0) || disabled
    const darkMode = theme.palette.mode === 'dark'
    const border = darkMode ? theme.palette.primary[600] : theme.palette.primary[600]
    const background = darkMode ? 'primary.900' : 'primary.300'

    return (
      <KeyButton
        disabled={keyDisabled}
        highlight={!functionKey && highlightKeys.indexOf(key) >= 0 ? 1 : 0}
        color={keyDisabled ? 'neutral' : 'white'}
        className={clsx({ invalid: invalidAnimationOn && keyDisabled })}
        variant="outlined"
        sx={{
          backgroundColor: keyDisabled ? 'transparent' : background,
          border: `1px solid ${border}`,
          ...sx,
        }}
        onClick={onClick}
      >
        {key}
      </KeyButton>
    )
  }

  return (
    <Sheet
      variant="plain"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: 2,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        background: theme.palette.mode === 'dark' ? 'rgba(11, 13, 14, 0.5)' : theme.palette.neutral[100],
      }}
    >
      {layout.map((row, index) => (
        <Grid
          key={`${row[0]}-${index}`}
          container
          gap={1}
          flexWrap="nowrap"
          justifyContent={'center'}
          sx={{ height: 58 }}
        >
          {row.map((key) => (
            <div key={key}>
              {key === 'DELETE' && (
                <Box>
                  {getPrimaryButton(<BackspaceIcon />, true, () => onDelete(), disabled, {
                    maxWidth: 65.4,
                    width: '100%',
                  })}
                </Box>
              )}
              {key === 'ENTER' && (
                <Box>
                  {getPrimaryButton(key, true, () => onEnter(), disabled, {
                    maxWidth: 65.4,
                    width: '100%',
                    fontSize: 12,
                  })}
                </Box>
              )}
              {key !== 'ENTER' && key !== 'DELETE' && (
                <Box>{getPrimaryButton(key, false, () => onKeyPressed(key), disabled)}</Box>
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
  keyboardEnabled: PropTypes.bool,
}
VKeyboard.defaultProps = {
  onKeyPressed: () => {},
  onDelete: () => {},
  onEnter: () => {},
  disabledKeys: [],
  highlightKeys: [],
  keyboardEnabled: false,
}

export default VKeyboard
