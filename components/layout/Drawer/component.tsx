import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Stack, Box } from '@mui/material';
import SimpleBar from './SimpleBar';
import SideBar from './sidebar';

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: { theme: any; open: boolean }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  paddingLeft: theme.spacing(open ? 3 : 0)
}));

export const DrawerHeader = ({ open }: { open: boolean }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        logo
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export const DrawerContent = ({ open } : { open:boolean }) => (
  <SimpleBar>
    <SideBar drawerOpen={open} />
    {/* {open ? "open" : "close"} */}
  </SimpleBar>
);

export default DrawerContent;
