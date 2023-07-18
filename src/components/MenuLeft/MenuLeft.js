import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import styles from "./MenuLeft.module.scss"
import { Logo } from "../../assets/images/index"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useRouter from "../../hooks/use-router";
import * as RouterPath from '../../router/RouterPath'

const drawerWidth = 240;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function MenuLeft(props) {
  
  const { value, handleChange, setIndex, idx, setValue } = props
  const router = useRouter();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        // sx={}
      >
        <Toolbar style={{ background: 'black' }}>
          <Typography variant="h6" noWrap component="div" >
            {(idx === 0) ? "Quản lý sản phẩm" : ""}
            {(idx === 1) ? "Quản lý  đơn hàng" : ""}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginTop: '10px',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            router.push({
              pathname: RouterPath.HOMEPAGE,
            })
          }}
        >
          <div className={styles.logo}>
            <img src={Logo} style={{ width: 70, height: 70 }} />
          </div>
          <div className={styles.headerName}
            style={{
              fontSize: '20px',
              fontWeight: '600'
            }}
          >
            SC SHOP Admin
          </div>
        </div>
        <List>
          {["Sản phẩm", "Đơn hàng"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                style={{
                  backgroundColor: `${(index === idx) ? "#dbdbdb" : "" }`
                }}
                onClick={(e) => {
                  setIndex(index)
                  if(index === 0)
                  {
                    handleChange(null, index )
                  }
                  else if (index === 1)
                  {
                    handleChange(null, index + 1)
                  }
                  else if(index === 2)
                  {
                    handleChange( null, index + 4)
                  }
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      {(idx === 0 ) && (<Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: '100%', }}
      >
        <Box sx={{ borderBottom: 1, 
                  width: '1000px', 
                  borderColor: 'divider', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginTop: '30px' ,
                  marginLeft: ' 100px',
              }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="inherit" indicatorColor="secondary">
            <Tab label="Sản Phẩm" {...a11yProps(0)} />
            <Tab label="Thêm/ Sửa sản phẩm" {...a11yProps(0)} />
          </Tabs>
        </Box>
      </Box>)}
      { idx === 1 &&
      (
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: '100%', }}
        >
          <Box sx={{ borderBottom: 1, 
                    width: '1200px', 
                    borderColor: 'divider', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginTop: '30px' ,
                    marginLeft: ' 100px',
                }}>
            <Tabs
              aria-label="basic tabs example"
              textColor="inherit" 
              indicatorColor="secondary"
              onChange={handleChange}
              value={value}
            >
              <Tab value={2} label="Đơn chưa duyệt" {...a11yProps(2)} />
              <Tab value={3} label="Đơn đã duyệt/ đang giao" {...a11yProps(3)} />
              <Tab value={4} label="Đơn Hoàn Thành" {...a11yProps(4)} />
              <Tab value={5} label="Đơn đã hủy/ không duyệt" {...a11yProps(5)} />
            </Tabs>
          </Box>
        </Box>
      )}
      { idx === 2 &&
      (
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: '100%', }}
        >
          <Box sx={{ borderBottom: 1, 
                    width: '1000px', 
                    borderColor: 'divider', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginTop: '30px' ,
                    marginLeft: ' 100px',
                }}>
            <Tabs
              aria-label="basic tabs example"
              textColor="inherit" 
              indicatorColor="secondary"
              onChange={handleChange}
              value={value}
            >
              <Tab value={6} label="Danh sách nhân viên" {...a11yProps(6)} />
              <Tab value={7} label="Thêm/ Thông tin nhân viên" {...a11yProps(7)} />
            </Tabs>
          </Box>
        </Box>
      )}
    </Box>
  );
}