import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/public-sans'
import './index.css'
import './animation.css'
import './disco.css'
import App from './App'
import { CssVarsProvider, getInitColorSchemeScript, useColorScheme, extendTheme } from '@mui/joy/styles'
import { Button, CssBaseline } from '@mui/joy'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Toaster } from 'sonner'

const theme = extendTheme({
  fontFamily: {
    display: 'Bubblegum Sans',
  },
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
    const currentMode = localStorage.getItem('theme')
    setMode(currentMode || 'dark')
  }, [])

  return (
    <Button
      variant="plain"
      onClick={() => {
        const newValue = mode === 'light' ? 'dark' : 'light'
        setMode(newValue)
        localStorage.setItem('theme', newValue)
      }}
      sx={{ position: 'fixed', bottom: 10, right: 10 }}
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </Button>
  )
}

root.render(
  <CssVarsProvider defaultMode="dark" theme={theme}>
    <Toaster position="top-center" offset='64px' richColors />
    <ModeToggle />
    <CssBaseline />
    <App />
  </CssVarsProvider>,
)
