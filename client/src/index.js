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

const materialTheme = materialExtendTheme()

getInitColorSchemeScript({ defaultMode: 'dark' })

const root = ReactDOM.createRoot(document.getElementById('root'))

function ModeToggle() {
  const { mode, setMode } = useColorScheme(localStorage.getItem('theme') || 'dark')
  const { setMode: setMaterialMode } = useMaterialColorScheme()

  React.useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://umami.shaneisrael.net/script.js'
    script.setAttribute('data-website-id', '6d89ddf8-0e11-4eb4-9a1f-6dff361d63c9')
    script.setAttribute('async', true)

    document.head.appendChild(script)
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
      sx={{ position: 'fixed', bottom: 10, right: 10 }}
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </Button>
  )
}

root.render(
  <MaterialCssVarsProvider defaultMode="dark" theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
    <JoyCssVarsProvider defaultMode="dark" theme={theme}>
      <Toaster position="top-center" offset="64px" richColors />
      <ModeToggle />
      <CssBaseline />
      <App />
    </JoyCssVarsProvider>
  </MaterialCssVarsProvider>,
)
