import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/public-sans'
import './index.css'
import './animation.css'
import App from './App'
import { CssVarsProvider, getInitColorSchemeScript, useColorScheme, extendTheme } from '@mui/joy/styles'
import { Button, CssBaseline } from '@mui/joy'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const theme = extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'sm-text' && {}),
        }),
      },
    },
  },
})

getInitColorSchemeScript({ defaultMode: 'dark' })

const root = ReactDOM.createRoot(document.getElementById('root'))

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMode('dark')
  }, [])

  return (
    <Button
      variant="plain"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
      sx={{ position: 'fixed', bottom: 10, right: 10 }}
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </Button>
  )
}

root.render(
  <CssVarsProvider defaultMode="dark" theme={theme}>
    <ModeToggle />
    <CssBaseline />
    <App />
  </CssVarsProvider>,
)
