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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
          <SideBarItem drawerOpen={drawerOpen} />
        </AccordionDetails>
      </Accordion>
      <SideBarItem drawerOpen={drawerOpen} />
    </>
  )
}

export default SideBar;
