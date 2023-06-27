import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Stack, Box } from '@mui/material';
import SimpleBar from './SimpleBar';

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

export const DrawerContent = () => (
  <SimpleBar>
    side
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    barrrrr
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    is
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    here
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    !!!
  </SimpleBar>
);

export default DrawerContent;
