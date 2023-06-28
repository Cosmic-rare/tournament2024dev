import { ListItemButton, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 260

const data1 = [
  { id: 'cliply98z0000io7gj96nzplj', title: '男バド', gread: 1 },
  { id: 'cliply9900001io7gon3tumdn', title: '女バド', gread: 1 },
  { id: 'cliply9900002io7g5na1vy2p', title: 'eスポーツ', gread: 1 },
  { id: 'cliply9900003io7gx4xtgy0k', title: '男バレー', gread: 1 },
  { id: 'cliply9900004io7gcqoy2zr5', title: '女バレー', gread: 1 },
  { id: 'cliply9910005io7gren09pd6', title: '男ドッヂボール', gread: 1 },
  { id: 'cliply9910006io7g2fato47y', title: '女ドッヂボール', gread: 1 }
]
const data2 = [
  { id: 'cliplykhr0007io7gdwy9uagr', title: '男バド', gread: 2 },
  { id: 'cliplykhs0008io7gb8k901a0', title: '女バド', gread: 2 },
  { id: 'cliplykhs0009io7gzt3l0lv3', title: 'eスポーツ', gread: 2 },
  { id: 'cliplykhs000aio7g0g284sk9', title: '男バレー', gread: 2 },
  { id: 'cliplykhs000bio7g6mq0zt3y', title: '女バレー', gread: 2 },
  { id: 'cliplykhs000cio7gxgwnzfr2', title: '男ドッヂボール', gread: 2 },
  { id: 'cliplykht000dio7gxb8u9cvy', title: '女ドッヂボール', gread: 2 }
]
const data3 = [
  { id: 'cliplzfvi000eio7gcik4kpg8', title: '男バド', gread: 3 },
  { id: 'cliplzfvi000fio7gdr7qcrhi', title: '女バド', gread: 3 },
  { id: 'cliplzfvi000gio7gz84lav21', title: 'eスポーツ', gread: 3 },
  { id: 'cliplzfvj000hio7gf25mnj0f', title: '男バレー', gread: 3 },
  { id: 'cliplzfvj000iio7gzsc664ul', title: '女バレー', gread: 3 },
  { id: 'cliplzfvj000jio7gx22s4sjn', title: '女ドッヂボール', gread: 3 },
  { id: 'cliplzfvj000kio7g6ugzo1sc', title: '男サッカー', gread: 3 }
]


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "primary.lighter",
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const SideBarItem = ({ drawerOpen, id, gread, title, setPage, onClose }: { drawerOpen: boolean, id: string, gread: number, title: string, setPage: Function, onClose: () => void }) => {
  const isSelected = false
  const level = 1
  const theme = useTheme()
  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <ListItemButton
      onClick={() => {setPage(id); onClose()}}
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
            {title + " (" + gread + "年)"}
          </Typography>
        }
      />

    </ListItemButton>
  )
};

const SideBar = ({ drawerOpen, page, setPage, onClose }: { drawerOpen: boolean, page: null | string, setPage: Function, onClose: () => void }) => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>1年</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data1.map((val, index) => {
            return (
              <SideBarItem setPage={setPage} drawerOpen={drawerOpen} id={val.id} gread={val.gread} title={val.title} key={index} onClose={onClose} />
            )
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>2年</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {data2.map((val, index) => {
            return (
              <SideBarItem setPage={setPage} drawerOpen={drawerOpen} id={val.id} gread={val.gread} title={val.title} key={index} onClose={onClose} />
            )
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>3年</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {data3.map((val, index) => {
            return (
              <SideBarItem setPage={setPage} drawerOpen={drawerOpen} id={val.id} gread={val.gread} title={val.title} key={index} onClose={onClose} />
            )
          })}
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default SideBar;
