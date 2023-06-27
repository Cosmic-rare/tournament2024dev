import { ListItemButton, ListItemText, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';

const drawerWidth = 260

const SideBarItem = ({ drawerOpen }: { drawerOpen: boolean }) => {
  const isSelected = false
  const level = 1
  const theme = useTheme()
  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <ListItemButton
      onClick={() => console.log("hey!!")}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          '&:hover': {
            bgcolor: 'primary.lighter'
          },
          '&.Mui-selected': {
            bgcolor: 'primary.lighter',
            borderRight: `2px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            '&:hover': {
              color: iconSelectedColor,
              bgcolor: 'primary.lighter'
            }
          }
        }),
        ...(!drawerOpen && {
          '&:hover': {
            bgcolor: 'transparent'
          },
          '&.Mui-selected': {
            '&:hover': {
              bgcolor: 'transparent'
            },
            bgcolor: 'transparent'
          }
        })
      }}
    >
      <ListItemText
        primary={
          <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
            {"title"}
          </Typography>
        }
      />

    </ListItemButton>
  )
};

const SideBar = ({ drawerOpen }: { drawerOpen: boolean }) => {
  return (
    <>
      <SideBarItem drawerOpen={drawerOpen} />
      <SideBarItem drawerOpen={drawerOpen} />
    </>
  )
}

export default SideBar;
