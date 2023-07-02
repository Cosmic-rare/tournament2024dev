import { ListItemButton, ListItemText, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { useSession, signOut, getSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import { dataType } from '@/pages/edit';

const drawerWidth = 260

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // borderTop: `1px solid ${theme.palette.divider}`,
  // borderBottom: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '&:hover': {
    bgcolor: 'primary.lighter'
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
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
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



const SideBar = ({ drawerOpen, page, setPage, onClose, sidebarData }: { drawerOpen: boolean, page: null | string, setPage: Function, onClose: () => void, sidebarData: dataType | null }) => {
  const { data: session } = useSession()

  return (
    <>
      {sidebarData ?
        <>
          <Box sx={{ pl: 3, mb: 1.5, mt: 2.5 }} >
            <Typography variant="subtitle2" color="textSecondary">
              試合
            </Typography>
          </Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>1年</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {sidebarData.data1.map((val: any, index: number) => {
                return (
                  <SideBarItem setPage={setPage} sex={val.sex} drawerOpen={drawerOpen} id={val.id} gread={val.gread} title={val.title} key={index} onClose={onClose} />
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
              {sidebarData.data2.map((val: any, index: number) => {
                return (
                  <SideBarItem setPage={setPage} sex={val.sex} drawerOpen={drawerOpen} id={val.id} gread={val.gread} title={val.title} key={index} onClose={onClose} />
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
              {sidebarData.data3.map((val: any, index: number) => {
                return (
                  <SideBarItem setPage={setPage} sex={val.sex} drawerOpen={drawerOpen} id={val.id} gread={val.gread} title={val.title} key={index} onClose={onClose} />
                )
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion><></></Accordion>
          <Box sx={{ pl: 3, mb: 1.5, mt: 2.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              ユーザー情報
            </Typography>
          </Box>
          {session ?
            <><p style={{ fontSize: 8 }}>{JSON.stringify(session)}</p>
              <button onClick={() => signOut()}>Sign out</button>
            </>
            :
            null}
        </>
        :
        null}
    </>
  )
}

export default SideBar;
