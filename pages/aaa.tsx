import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material"
import ArchiveIcon from '@mui/icons-material/Archive'
import Link from "next/link"

const BottomNav = () => {
  const router = useRouter()

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={null}
        onChange={(_, newValue) => {
          console.log(newValue)
        }}
        showLabels={true}
        style={{ backgroundColor: '#2196f3' }}
        sx={{ height: 56 }}
      >
        <BottomNavigationAction label="" icon={<ArchiveIcon />} onClick={() => router.push('/')} />
        <BottomNavigationAction label="" icon={<ArchiveIcon />} onClick={() => router.push('/another')} />
        <BottomNavigationAction label="" icon={<ArchiveIcon />} />
        <BottomNavigationAction label="" icon={<ArchiveIcon />} />
      </BottomNavigation>
    </Paper>
  )
}

const resize = () => {
  const height = window.innerHeight
  const width = window.innerWidth
  document.documentElement.style.setProperty('--100vh', `${height}px`)
  document.documentElement.style.setProperty('--100vw', `${width}px`)
  return { height: height, width: width }
}

const App = () => {
  const [innerSize, setInnerSize] = useState({ height: 0, width: 0 })
  const handleResize = () => {
    setInnerSize(resize())
  }
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
  }, [])

  const router = useRouter()

  if (innerSize.width <= 700) {
    return (
      <div>
        <div style={{ padding: 10, paddingBottom: 56 }}>
          {/* <Component {...pageProps} /> */}
          <h1>Content</h1>
        </div>
        <BottomNav />
      </div>
    )
  } else {
    return (
      <div style={{ height: 'var(--100vh)', maxWidth: 900, width: '70%', minWidth: 600, display: 'flex', margin: '0px auto' }}>
        <div style={{
          height: '100%',
          width: 220,
          overflowX: 'hidden',
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flexShrink: 0,
          paddingTop: 15 + 50
        }}>
          <Link href={"/"}>
            <div style={{ width: 220, height: 50, display: "flex", alignItems: "center", padding: "auto" }}>
              <ArchiveIcon style={{ width: 30, height: 30, margin: 10 }} />
              <div style={{ marginLeft: 10 }}>Tournament</div>
            </div>
          </Link>
          <Link href={"/"}>
            <div style={{ width: 220, height: 50, display: "flex", alignItems: "center", padding: "auto" }}>
              <ArchiveIcon style={{ width: 30, height: 30, margin: 10 }} />
              <div style={{ marginLeft: 10 }}>Tournament</div>
            </div>
          </Link>
          <Link href={"/"}>
            <div style={{ width: 220, height: 50, display: "flex", alignItems: "center", padding: "auto" }}>
              <ArchiveIcon style={{ width: 30, height: 30, margin: 10 }} />
              <div style={{ marginLeft: 10 }}>Tournament</div>
            </div>
          </Link>
          <Link href={"/"}>
            <div style={{ width: 220, height: 50, display: "flex", alignItems: "center", padding: "auto" }}>
              <ArchiveIcon style={{ width: 30, height: 30, margin: 10 }} />
              <div style={{ marginLeft: 10 }}>Tournament</div>
            </div>
          </Link>

        </div>
        <div style={{ height: '100%', width: '100%', overflowX: 'hidden', padding: 10 }}>
          {/* <Component {...pageProps} /> */}
          <h1>Content</h1>
        </div>
      </div>
    )
  }
}

export default App
