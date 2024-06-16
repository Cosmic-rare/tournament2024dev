import { ListItemButton, ListItemText, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useTheme } from '@mui/material/styles';
import { dataType } from '@/util/type';

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

const SideBarItem = ({ drawerOpen, id, gread, title, setPage, onClose, sex }: { drawerOpen: boolean, id: string, gread: number, title: string, setPage: Function, onClose: () => void, sex: string }) => {
  const isSelected = false
  const level = 1
  const theme = useTheme()
  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main'

  return (
    <ListItemButton
      onClick={() => { setPage(id); onClose() }}
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
            {sex === "male" ? "男" : sex === "female" ? "女" : ""}{title + " (" + gread + "年)"}
          </Typography>
        }
      />

    </ListItemButton>
  )
};



const SideBar = ({ drawerOpen, page, setPage, onClose, sidebarData, isMobile }: { drawerOpen: boolean, page: null | string, setPage: Function, onClose: () => void, sidebarData: dataType | null, isMobile: boolean }) => {

  const onHandleClone = () => {
    if (isMobile) {
      onClose()
    }
  }

  return (
    <>
      {sidebarData ?
        <>
          <Box sx={{ pl: 3, mb: 1.5, mt: 2.5 }} >
            <Typography variant="subtitle1" color="textPrimary">
              1年
            </Typography>
          </Box>
            <AccordionDetails>
              {sidebarData.data1.map((val: any, index: number) => {
                return (
                  <SideBarItem setPage={setPage} sex={val.sex} drawerOpen={drawerOpen} id={val.id} gread={val.gread} title={val.title} key={index} onClose={onHandleClone} />
                )
              })}
            </AccordionDetails>
          
          <Box sx={{ pl: 3, mb: 1.5, mt: 2 }} />
        </>
        :
        null}
    </>
  )
}

export default SideBar;
