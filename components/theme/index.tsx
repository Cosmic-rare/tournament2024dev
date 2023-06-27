import { useMemo } from 'react';
import { CssBaseline, StyledEngineProvider, Direction } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Palette from './palette';
import Typography from './typography';
import componentsOverride from './overrides';

export default function ThemeCustomization({ children }: { children: React.ReactNode }) {
  const theme = Palette();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography = Typography(`'Public Sans', sans-serif`);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536
        }
      },
      direction: 'ltr' as Direction,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      customShadows: {},
      typography: themeTypography
    }),
    [theme, themeTypography]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

