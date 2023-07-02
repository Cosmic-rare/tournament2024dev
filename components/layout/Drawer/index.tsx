import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// project import
import { DrawerHeader, DrawerContent } from './component';
import { dataType } from '@/pages/edit';

// project import
const drawerWidth = 260

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden',
  boxShadow: 'none'
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: 0,
  borderRight: 'none',
  boxShadow: theme.customShadows.z1
});

// @ts-ignore
const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: { theme: any; open: boolean }) => {
  const openedStyle = openedMixin(theme);
  const closedStyle = closedMixin(theme);

  return {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open ? openedStyle : closedStyle),
    '& .MuiDrawer-paper': open ? openedStyle : closedStyle,
  };
});

const MainDrawer = ({ open, handleDrawerToggle, window, page, setPage, sidebarData }: { open: boolean; handleDrawerToggle: () => void; window: any, page: null | string, setPage: Function, sidebarData: dataType | null }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent open={open}  page={page} setPage={setPage} onClose={handleDrawerToggle} sidebarData={sidebarData} />, [open, page, setPage, sidebarData]);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={open}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit'
            }
          }}
        >
          {open && drawerHeader}
          {open && drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

MainDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default MainDrawer;
