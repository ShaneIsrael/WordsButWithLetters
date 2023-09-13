import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Sheet, styled } from '@mui/joy'
import BackspaceIcon from '@mui/icons-material/Backspace'

const KeyButton = styled(Button)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#3D3D4F' : '#bdbdbd',
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
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

const VKeyboard = ({ onKeyPressed, onDelete, onEnter, disabledKeys }) => {
  React.useEffect(() => {
    function handleKeyDown(e) {
      if (/^[a-zA-Z]$/.test(e.key)) {
        console.log(`${e.key} is a letter`)
        return onKeyPressed(e.key.toUpperCase())
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        console.log(`DELETE`)
        return onDelete()
      }
      if (e.key === 'Enter') {
        console.log(`ENTER`)
        return onEnter()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onKeyPressed, onDelete, onEnter])

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: 2,
      }}
    >
      {layout.map((row, index) => (
        <Grid key={`${row[0]}-${index}`} container gap={1}>
          {row.map((key) => (
            <div key={key}>
              {key === 'DELETE' && (
                <KeyButton variant="outlined" onClick={onDelete} sx={{ width: 65.4 }}>
                  <BackspaceIcon />
                </KeyButton>
              )}
              {key === 'ENTER' && (
                <KeyButton variant="outlined" onClick={onEnter} sx={{ width: 65.4, fontSize: 12 }}>
                  {key}
                </KeyButton>
              )}
              {key !== 'ENTER' && key !== 'DELETE' && (
                <KeyButton
                  disabled={disabledKeys.indexOf(key) >= 0}
                  color={disabledKeys.indexOf(key) >= 0 ? 'neutral' : 'primary'}
                  variant="outlined"
                  onClick={() => onKeyPressed(key)}
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
}
VKeyboard.defaultProps = {
  onKeyPressed: () => {},
  onDelete: () => {},
  onEnter: () => {},
  disabledKeys: [],
}

export default VKeyboard
