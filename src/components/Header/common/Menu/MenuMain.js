import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import IconUser from "../../../../assets/icons/icon-users";
import { Link } from "react-router-dom";
import useRouter from "../../../../hooks/use-router";
import { ImageHeader } from "../../../../assets/images";
import * as RouterPath from "../../../../router/RouterPath"
import Cookies from "js-cookie";
import { Popover } from '@mui/material';
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function MenuMain(props) {
  // const { isLogin } = props;
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;


  return (
    <AppBar 
        position="static"
        style={{
            minHeight: '70px',
            maxHeight: '70px',
            margin: 0
        }}
    >
      <Container 
      maxWidth="100%"
        sx={{ 
          backgroundColor: "#e9ecef",
        }}
      >
        <Toolbar 
          disableGutters
        >
          <IconButton
            onClick={(e) => {
              router.push({
                pathname: "/",
              });
            }}
            sx={{
              marginLeft: '7%'
            }}
          >
            <img src={ImageHeader} height={50} style={{ borderRadius: 10 }} />
          </IconButton>
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "flex-end",
                    width: '100%',
                    marginRight: '2%',
                    height: '100%'
                }}
            >
                <Button
                    key={1}
                    onClick={(e) => {
                      router.push({
                        pathname: RouterPath.HOME
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Trang chủ
                </Button>
                <Button
                    key={2}
                    onClick={(e) => {
                      router.push({
                        pathname: RouterPath.BRANCH_PAGE
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Lịch chiếu
                </Button>  
                <Button
                    key={3}
                    onClick={handleClick}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Phim
                </Button> 
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  styles={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Button 
                      sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '50px',
                        margin: '0px'
                    }}
                    onClick={() => {
                      router.push({
                        pathname: RouterPath.FILMS_PLAYING,
                        params: {
                          status: 10,
                        }
                      })
                      handleClose()
                    }}
                  >
                    Phim sắp chiếu
                  </Button>
                  <Button 
                    sx={{ 
                      my: 2, 
                      color: "black", 
                      display: "block",
                      '&:hover': {
                          color: 'white',
                          bgcolor: '#bb2c2c',
                      },
                      height: '50px',
                      margin: '0px'
                    }}
                    onClick={() => {
                      router.push({
                        pathname: RouterPath.FILMS_PLAYING,
                        params: {
                          status: 20,
                        }
                      })
                      handleClose()
                    }}
                  >
                    Phim đang chiếu
                  </Button>
                  </div>
                </Popover>
                {/* <Button
                    key={4}
                    onClick={() => {
                      router.push({
                        // pathname: RouterPath.ACCOUNT
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Khuyến mãi
                </Button> */}
                <Button
                    key={5}
                    onClick={() => {
                      if(Cookies.get('isLogin'))
                      {
                        router.push({
                          pathname: RouterPath.ACCOUNT
                        })
                      } else {
                        router.push({
                          pathname: RouterPath.LOGIN
                        })
                      }
                      
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Tài khoản
                </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuMain;
