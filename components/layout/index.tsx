import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import { dataType } from '@/pages/edit';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ children, page, setPage, sidebarData }: { children: React.ReactNode, page: null | string, setPage: Function, sidebarData: dataType | null }) => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));

  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(!matchDownLG);
  }, [matchDownLG]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} page={page} setPage={setPage} sidebarData={sidebarData} />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
