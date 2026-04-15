import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "sans-serif"',
    h1: { fontFamily: '"Inter", "sans-serif"' },
    h2: { fontFamily: '"Inter", "sans-serif"' },
    h3: { fontFamily: '"Inter", "sans-serif"' },
    h4: { fontFamily: '"Inter", "sans-serif"' },
    h5: { fontFamily: '"Inter", "sans-serif"' },
    h6: { fontFamily: '"Inter", "sans-serif"' },
    subtitle1: { fontFamily: '"Inter", "sans-serif"' },
    subtitle2: { fontFamily: '"Inter", "sans-serif"' },
    body1: { fontFamily: '"Inter", "sans-serif"' },
    body2: { fontFamily: '"Inter", "sans-serif"' },
    button: { fontFamily: '"Inter", "sans-serif"' },
    caption: { fontFamily: '"Inter", "sans-serif"' },
    overline: { fontFamily: '"Inter", "sans-serif"' },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h6',
          subtitle2: 'h6',
          body1: 'p',
          body2: 'p',
        },
      },
    },
  },
});

export default theme;
