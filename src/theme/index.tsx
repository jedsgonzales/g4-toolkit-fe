// https://mui.com/material-ui/customization/color/

import PropTypes from 'prop-types'
import { useMemo } from 'react'
// material
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
//import { orange } from '@mui/material/colors'
//
import shape from './shape'
//import palette from './palette'
import typography from './typography'
import breakpoints from './breakpoints'
import GlobalStyles from './globalStyles'
//import componentsOverride from './overrides'
import shadows, { customShadows } from './shadows'
import { useTheme } from '@emotion/react'
//import { Palette } from '@mui/icons-material'

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
    children: PropTypes.node
}

function ThemeConfig({ children }: any) {
    /*
    const themeOptions = useMemo(
        () => ({
            //palette: palette.dark,
            palette: {
                mode: 'dark',
                background: {
                    default: "#000000"
                },
                primary: {
                    main: '#FFC34C',
                },
                secondary: {
                    main: '#F44336',
                },
            },
            shape,
            typography,
            breakpoints,
            shadows: shadows.dark,
            customShadows: customShadows.dark
        }), [])

    const theme = createTheme(themeOptions)
    theme.components = componentsOverride(theme)
    */
    const theme = useTheme()

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default ThemeConfig