import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/public-sans'
import './index.css'
import './animation.css'
import './disco.css'
import App from './App'
import { getInitColorSchemeScript, useColorScheme, extendTheme } from '@mui/joy/styles'
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  useColorScheme as useMaterialColorScheme,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles'
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles'
import { KofiButton } from 'react-kofi-button'

import { Box, Button, CssBaseline } from '@mui/joy'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Toaster } from 'sonner'

import AuthService from './services/AuthService'
import { Fade } from '@mui/material'

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

const materialTheme = materialExtendTheme()

getInitColorSchemeScript({ defaultMode: 'dark' })

const root = ReactDOM.createRoot(document.getElementById('root'))

function ModeToggle() {
  const { mode, setMode } = useColorScheme(localStorage.getItem('theme') || 'dark')
  const { setMode: setMaterialMode } = useMaterialColorScheme()

  React.useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT === 'production') {
      const script = document.createElement('script')

      script.src = 'https://umami.shaneisrael.net/script.js'
      script.setAttribute('data-website-id', '6d89ddf8-0e11-4eb4-9a1f-6dff361d63c9')
      script.setAttribute('async', true)
      document.head.appendChild(script)
    } else {
      window.umami = {
        track: (val) => console.log('umami.track -> ', val),
      }
    }
    async function init() {
      try {
        await AuthService.createCasualSession()
      } catch (err) {
        console.error(err)
      }
    }
    init()
  }, [])

  return (
    <Button
      variant="plain"
      onClick={() => {
        const newValue = mode === 'light' ? 'dark' : 'light'
        setMode(newValue)
        setMaterialMode(newValue)
        localStorage.setItem('theme', newValue)
      }}
      sx={{ position: 'fixed', bottom: 10, right: 10, zIndex: 10000 }}
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </Button>
  )
}

function KofiButtonComponent() {
  const [show, setShow] = React.useState(true)

  React.useEffect(() => {
    let timeout = null
    const handleKofiFade = (e) => {
      const distancedScrolled = document.getElementById('scrollableViewport').scrollTop
      if (distancedScrolled > 0 && show) {
        setShow(false)
      }
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(() => setShow(true), 1000)
    }

    document.addEventListener('wheel', handleKofiFade)
    return function cleanup() {
      if (timeout) {
        clearTimeout(timeout)
      }
      document.removeEventListener('wheel', handleKofiFade)
    }
  }, [])

  return (
    <Fade in={show}>
      <Box position="absolute" bottom={16} left={16} zIndex={9999}>
        <KofiButton
          username="wordsbutwithletters"
          label="Support us"
          preset="skinny"
          backgroundColor="kofiBlue"
          animation
        />
      </Box>
    </Fade>
  )
}

root.render(
  <MaterialCssVarsProvider defaultMode="dark" theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
    <JoyCssVarsProvider defaultMode="dark" theme={theme}>
      <Toaster position="top-center" offset="64px" richColors />
      <ModeToggle />
      <KofiButtonComponent />
      <CssBaseline />
      <App />
    </JoyCssVarsProvider>
  </MaterialCssVarsProvider>,
)
