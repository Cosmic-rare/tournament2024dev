import { Box, useMediaQuery, AppBar } from '@mui/material';
const drawerWidth = 260
import { styled } from '@mui/material/styles';

export const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  return <>{matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}</>;
};

export const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: { theme: any; open: boolean, color: any }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));
