
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import styles from './change.module.scss'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import { Checkbox, Button } from "@mui/material";
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import LoginAction from "../../redux/login/action";
import Utils from "../../utils/Utils";
import ToastifyCommom from "../../shared/components/toastify/ToastifyCommon"
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { makeStyles } from "@mui/styles";
import useRouter from "../../hooks/use-router";
import { TextInput } from "../../components/CustomMUI/ListCustomMui";
import * as RouterPath from "../../router/RouterPath"
import Registor from "../../components/Register/Registor";
import ChangePage from "../../components/change/ChangePage";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const useStyles = makeStyles({
    flexGrow: {
      flex: '1',
    },
    button: {
      backgroundColor: '#3c52b2',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#3c52b2',
    },
  }})
  const LabelCustom = (item) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    color:'#efe9e9',
                    fontFamily: 'Cemoji',
                    fontWeight: 500,
                    fontSize: '16px'
                }}
            >
                {item}
            </div>
        </div>    
    )
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Change = () => {
    const router= useRouter()
    let params = { ...router.getAll() };
    const [value, setValue] = useState(params?.page ?? 0);
    useEffect(() => {
        if(params?.page == null || typeof params?.page == 'undefined')
        {        
            setValue(0)
        } else {
            setValue(1)
        }
    },[params])
    const[isLogin, setIsLogin] = React.useState(false);

    if( typeof Cookies.get('userPBL6') != 'undefined' && isLogin)
    {
        router.push({
            pathname: '/account',
        })
    }

    const handleChange = (event, newValue) => {
        // setValue(newValue);
        router.push({
            pathname: RouterPath.LOGIN,
            // page: newValue,
            params: {
                page: newValue,
            }
        })
    };
    
   

    const dispatch = useDispatch()

    const setLocation = () => {
        window.location = '/'
    }
    // const getUserData = async () => {
    //     dispatch({
    //         type: LoginAction.GET_USER_DETAIL,
    //         onSuccess: () => {
    //             setIsLogin(true)
    //             router.goBack()
    //         }
    //     })
    // }
    
    React.useEffect(() => {
        if(setIsLogin(true))
            router.goBack()
        // getUserData();
    }, [])

    return (
        <div className={styles.ChangePageMain}>
            <ToastifyCommom />
            <div className={styles.loginMainContent}>
                <Header />
                <Box className={styles.pageCenter}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab sx={{ backgroundColor: 'red', marginRight: '20px', borderRadius: '5px' }} label={LabelCustom("Đổi mật khẩu")} {...a11yProps(0)} />
                            {/* <Tab sx={{ backgroundColor: 'red', borderRadius: '5px'  }} label={LabelCustom("Đăng ký")} {...a11yProps(1)} /> */}
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ChangePage />
                    </TabPanel>
                    {/* <TabPanel value={value} index={1}>
                        <Registor />
                    </TabPanel> */}
                </Box>
            </div>
        </div>
    )
}

export default Change

