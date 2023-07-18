import React, { useEffect, useState } from "react";
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
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";

function HederMui(props) {
  
  const [dataCookies, setDataCookies] = useState(Cookies.get());
  const token = Cookies.get('token')
  var userLogin = useSelector((state) => state?.Login?.userLogin);
  useEffect(() => {
    setDataCookies(Cookies.get());
  }, [token]);  
  const router = useRouter();

  return (
    <AppBar 
        position="static"
        style={{ minHeight: '50px', maxWidth: '100%' }}
    > 
      <Container maxWidth="100%" sx={{ backgroundColor: "#22272b", minHeight: '50px' }}>
        <Toolbar disableGutters
          sx={{
            padding: 0,
            maxWidth: '100%'
          }}
        >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                height: '50px',
                color: '#ffdade',
                justifyContent: "center",
                width: '30%',
                alignItems: 'center',
                alignContent: 'center',
                marginLeft: '2%'
            }}
            >
                <div>MOMOCHI</div>
                <div>Entertaiment Center</div>
            </Box>
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    height: '50px',
                    justifyContent: "flex-end",
                    alignItems: 'center',
                    width: '100%',
                    marginRight: '2%'
                }}
            >
                <button 
                    style={{
                      width: '131.96px',
                      minHeight: '30px',
                      borderRadius: '100px',
                      marginLeft: '36px',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      color: '#D9D9D9',
                      border: '1px solid #D9D9D9',
                      backgroundColor:'rgb(187, 44, 44)',
                    }}
                    onClick={(e) => {
                      router.push({
                        pathname: RouterPath.BOOKING_PAGE,
                      });
                    }}
                >
                    Vé của Tôi
                </button>
               {
                dataCookies?.isLogin && 
                  <div
                    style={{
                      color: '#D9D9D9',
                      border: '1px solid #D9D9D9',
                      width: 'fitContent',
                      borderRadius: '3px',
                      padding: '0px 4px',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      router.push({
                        pathname: RouterPath.ACCOUNT,
                      });
                    }}
                  >
                    {userLogin?.name}
                  </div>
               }
              {
                !dataCookies?.isLogin &&
                <Button
                    key={1}
                    onClick={(e) => {
                      router.replacePage({ params: RouterPath.LOGIN})
                     }
                    }
                    sx={{ 
                        my: 1, 
                        padding: '2px 5px 2px 5px',
                        borderRadius: '3px',
                        color: "white",
                        display: "block",
                        bgcolor: '#22272b',
                        fontSize: '14',
                        textTransform: 'capitalize',
                        '&:hover': {
                          bgcolor: '#bb2c2c',
                        },
                     }}
                    >
                        Đăng nhập
                    </Button> 
                }
                {
                  !dataCookies?.isLogin &&
                  <Button
                          key={2}
                          onClick={(e) => {
                            // router.replacePage({ params: RouterPath.LOGIN})
                            router.push({
                              pathname: RouterPath.LOGIN,
                              params: {
                                page: 1,
                            }
                            })
                          }
                          }
                          sx={{ 
                              my: 2, 
                              padding: '2px 5px 2px 5px',
                              borderRadius: '3px',
                              color: "white",
                              display: "block",
                              bgcolor: '#22272b',
                              textTransform: 'capitalize',
                                  '&:hover': {
                                bgcolor: '#bb2c2c',
                              },
                          }}
                      >
                          Đăng ký
                  </Button>  
                }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HederMui;
