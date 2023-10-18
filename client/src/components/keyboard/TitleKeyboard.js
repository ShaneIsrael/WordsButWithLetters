import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, Sheet, styled } from '@mui/joy'
import BackspaceIcon from '@mui/icons-material/Backspace'
import { useTheme } from '@emotion/react'

const KeyButton = styled(Button)(({ theme, sx }) => ({
  ...theme.typography['body-sm'],
  borderRadius: 0,
  fontWeight: 'bold',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.5,
  },
  '&.Mui-disabled': {
    border: theme.palette.mode === 'light' && '1px solid lightGrey',
  },
  ...sx,
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
          border: `1px solid ${border}`,
          paddingInline: { xs: '14px', md: '16px' },
          width: { xs: 21.5, md: 43 },
          height: { xs: 25, md: 58 },
          fontSize: { xs: '1em', md: '1.25em' },
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
        width: { xs: 350, md: 534 },
        gap: 1,
        padding: { xs: 1.5, md: 2 },
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
      }}
    >
      {layout.map((row, index) => (
        <Grid
          key={`${row[0]}-${index}`}
          container
          gap={{ xs: 0.5, md: 1 }}
          flexWrap="nowrap"
          justifyContent={'center'}
          sx={{ height: { xs: 32, md: 58 } }}
        >
          {row.map((key, index) => (
            <div key={`${key}_${index}`}>
              {key === 'DELETE' && (
                <Box>
                  {getPrimaryButton(
                    <BackspaceIcon
                      sx={{
                        width: { xs: 16, md: 24 },
                      }}
                    />,
                    true,
                    {
                      maxWidth: { xs: 48, md: 65.4 },
                      width: '100%',
                    },
                  )}
                </Box>
              )}
              {key === 'ENTER' && (
                <Box>
                  {getPrimaryButton(key, true, {
                    maxWidth: { xs: 48, md: 65.4 },
                    width: '100%',
                    fontSize: { xs: 8, md: 12 },
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
