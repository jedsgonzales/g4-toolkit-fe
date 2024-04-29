import { alpha } from '@mui/material/styles'

// ----------------------------------------------------------------------

function createGradient(color1: any, color2: any) {
    return `linear-gradient(to bottom, ${color1}, ${color2})`
}

// SETUP COLORS
const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8)
}

const GREY_DARK = {
    0: '#000000',
    900: '#F9FAFB',
    800: '#F4F6F8',
    700: '#DFE3E8',
    600: '#C4CDD5',
    500: '#919EAB',
    400: '#637381',
    300: '#454F5B',
    200: '#212B36',
    100: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#212B36', 0.8)
}

// https://docs-minimals.vercel.app/foundations/color
// https://minimals.cc/components/foundation/colors
// lighter 100, light 300, main 500, dark 700, darker 900
const PRIMARY = {
    lighter: '#ffe0b2',
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
    darker: '#e65100',
    contrastText: '#fff'
}
/*
const PRIMARY = {
    lighter: '#ffe0b2',
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
    darker: '#e65100',
    contrastText: '#fff'
}
*/
const SECONDARY = {
    lighter: '#D6E4FF',
    light: '#84A9FF',
    main: '#5F85DB',
    dark: '#809FE7',
    darker: '#091A7A',
    contrastText: '#fff'
}
const INFO = {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
    contrastText: '#fff'
}
const SUCCESS = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GREY[800]
}
const WARNING = {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: GREY[800]
}
const ERROR = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#E43F5A',
    dark: '#B72136',
    darker: '#7A0C2E',
    contrastText: '#fff'
}

const GRADIENTS = {
    primary: createGradient(PRIMARY.light, PRIMARY.main),
    info: createGradient(INFO.light, INFO.main),
    success: createGradient(SUCCESS.light, SUCCESS.main),
    warning: createGradient(WARNING.light, WARNING.main),
    error: createGradient(ERROR.light, ERROR.main)
}

const palette = {
    light: {
        common: { black: '#000', white: '#fff' },
        primary: { ...PRIMARY },
        secondary: { ...SECONDARY },
        info: { ...INFO },
        success: { ...SUCCESS },
        warning: { ...WARNING },
        error: { ...ERROR },
        grey: GREY,
        gradients: GRADIENTS,
        divider: GREY[500_24],
        text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
        background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
        action: {
            active: GREY[600],
            hover: GREY[500_8],
            selected: GREY[500_16],
            disabled: GREY[500_80],
            disabledBackground: GREY[500_24],
            focus: GREY[500_24],
            hoverOpacity: 0.08,
            disabledOpacity: 0.48
        }
    },
    dark: {
        common: { black: '#fff', white: '#000' },
        primary: { ...PRIMARY },
        secondary: { ...SECONDARY },
        info: { ...INFO },
        success: { ...SUCCESS },
        warning: { ...WARNING },
        error: { ...ERROR },
        grey: GREY_DARK,
        gradients: GRADIENTS,
        divider: GREY[500_24],
        text: { primary: GREY[100], secondary: GREY[600], disabled: GREY[100] },
        background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
        action: {
            active: GREY[600],
            hover: GREY[500_8],
            selected: GREY[500_16],
            disabled: GREY[500_80],
            disabledBackground: GREY[500_24],
            focus: GREY[500_24],
            hoverOpacity: 0.08,
            disabledOpacity: 0.48
        }
    }
}

export default palette