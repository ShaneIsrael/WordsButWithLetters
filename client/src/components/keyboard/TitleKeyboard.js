import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, Sheet, styled } from '@mui/joy'
import BackspaceIcon from '@mui/icons-material/Backspace'
import { useTheme } from '@emotion/react'

const KeyButton = styled(Button)(({ theme }) => ({
  ...theme.typography['body-sm'],
  borderRadius: 0,
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
  ['', '', 'W', 'O', 'R', 'D', 'S', '', '', ''],
  ['B', 'U', 'T', '', '', 'W', 'I', 'T', 'H'],
  ['ENTER', 'L', 'E', 'T', 'T', 'E', 'R', 'S', 'DELETE'],
]

const TitleKeyboard = ({ props }) => {
  const theme = useTheme()

  const getPrimaryButton = (key, disabled, sx) => {
    const keyDisabled = disabled || !key
    const darkMode = theme.palette.mode === 'dark'
    const border = darkMode ? theme.palette.primary[600] : theme.palette.primary[600]
    const background = darkMode ? 'primary.900' : 'primary.300'

    return (
      <KeyButton
        disabled={keyDisabled}
        color={keyDisabled ? 'neutral' : 'white'}
        variant="outlined"
        sx={{
          backgroundColor: keyDisabled ? 'transparent' : background,
          border: keyDisabled ? `1px solid grey` : `1px solid ${border}`,
          ...sx,
        }}
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
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
      }}
    >
      {layout.map((row, index) => (
        <Grid key={`${row[0]}-${index}`} container gap={1} flexWrap="nowrap" justifyContent={'center'}>
          {row.map((key, index) => (
            <div key={`${key}_${index}`}>
              {key === 'DELETE' && (
                <Box>
                  {getPrimaryButton(<BackspaceIcon />, true, {
                    maxWidth: 65.4,
                    width: '100%',
                  })}
                </Box>
              )}
              {key === 'ENTER' && (
                <Box>
                  {getPrimaryButton(key, true, {
                    maxWidth: 65.4,
                    width: '100%',
                    fontSize: 12,
                  })}
                </Box>
              )}
              {key !== 'ENTER' && key !== 'DELETE' && <Box>{getPrimaryButton(key)}</Box>}
            </div>
          ))}
        </Grid>
      ))}
    </Sheet>
  )
}

TitleKeyboard.propTypes = {}
TitleKeyboard.defaultProps = {}

export default TitleKeyboard
