import { merge } from 'lodash';

function Chip(theme: any) {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&:active': {
            boxShadow: 'none'
          }
        },
        sizeLarge: {
          fontSize: '1rem',
          height: 40
        },
        light: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.lighter,
          borderColor: theme.palette.primary.light,
          '&.MuiChip-lightError': {
            color: theme.palette.error.main,
            backgroundColor: theme.palette.error.lighter,
            borderColor: theme.palette.error.light
          },
          '&.MuiChip-lightSuccess': {
            color: theme.palette.success.main,
            backgroundColor: theme.palette.success.lighter,
            borderColor: theme.palette.success.light
          },
          '&.MuiChip-lightWarning': {
            color: theme.palette.warning.main,
            backgroundColor: theme.palette.warning.lighter,
            borderColor: theme.palette.warning.light
          }
        }
      }
    }
  };
}

function IconButton(theme: any) {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 4
        },
        sizeLarge: {
          width: theme.spacing(5.5),
          height: theme.spacing(5.5),
          fontSize: '1.25rem'
        },
        sizeMedium: {
          width: theme.spacing(4.5),
          height: theme.spacing(4.5),
          fontSize: '1rem'
        },
        sizeSmall: {
          width: theme.spacing(3.75),
          height: theme.spacing(3.75),
          fontSize: '0.75rem'
        }
      }
    }
  };
}

export default function ComponentsOverrides(theme: any) {
  return merge(Chip(theme), IconButton(theme));
}
