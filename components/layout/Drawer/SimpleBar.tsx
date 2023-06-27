import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import SimpleBarReact from 'simplebar-react';
import { BrowserView, MobileView } from 'react-device-detect';

const RootStyle = styled(BrowserView)({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden'
});

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }: { theme: any }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[500], 0.48)
    },
    '&.simplebar-visible:before': {
      opacity: 1
    }
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6
  },
  '& .simplebar-mask': {
    zIndex: 'inherit'
  }
}));

interface SimpleBarScrollProps {
  children?: React.ReactNode;
  sx?: React.CSSProperties;
}

const SimpleBarScroll = ({ children, sx, ...other }: SimpleBarScrollProps) => {
  return (
    <>
      <RootStyle>
        <SimpleBarStyle clickOnTrack={false} sx={sx} {...other}>
          {children}
        </SimpleBarStyle>
      </RootStyle>
      <MobileView>
        <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
          {children}
        </Box>
      </MobileView>
    </>
  );
};

export default SimpleBarScroll;
