
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from './ChangePass.module.scss'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const login = useSelector((state) => state.Login)

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
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ChangePass = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm()
    const onSubmit = (data) => {
        changePass(data)
    }

    const dispatch = useDispatch()

    const setLocation = () => {
        window.location = '/'
    }
    const getUserData = async () => {
        dispatch({
            type: LoginAction.GET_USER_DETAIL,
            onSuccess: () => {
                // setIsLogin(true)
            }
        })
    }
    
    React.useEffect(() => {
        getUserData();
    }, [])
    const changePass = async (data) => {
        if (data.inputConfirmPassword !== data.inputPassword)
        {
            Utils.showErrorToast({
                message: 'Mật khẩu không trùng nhau, vui lòng kiểm tra lại!'
            })
            return
        }
        else {
            const DateSubmit = {
                passwordOld: data.passwordOld,
                passwordNew: data.inputPassword,
            }
            try {
                dispatch({
                    type: LoginAction.CHANGE_PASSWORD,
                    data: DateSubmit,
                    onSuccess: () => {
                        Utils.showSuccessToast({
                            message: 'Đổi mật khẩu thành công, vui lòng đăng nhập lại!'
                        })
                        Cookies.remove()
                        window.location = '/login'
                    },
                    onError: (data) => {
                        Utils.showErrorToast({
                            message: 'Đổi mật khẩu thất bại, vui lòng kiểm tra lại!'
                        })
                    },
                })
            } catch (err) {
                console.log(err)
            }
        }
    };

    const isValidEmail = email =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

    const handleEmailValidation = email => {
        const isValid = isValidEmail(email);
        return isValid;
    };

    const classes = useStyles()

    return (
        <div className={styles.shopOnlineMain}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Header />
                <ToastifyCommom />
                <div className={styles.loginMain}>
                    <div style={{ width: '500px' }}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Đổi mật khẩu" {...a11yProps(0)} />
                                    {/* <Tab label="Đăng ký" {...a11yProps(1)} /> */}
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className={styles.loginDetail}>
                                    <div>
                                        <Controller
                                            control={control}
                                            defaultValue={null}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { ref, ...rest } }) => (
                                                <TextField
                                                    {...rest}
                                                    _props={{ inputRef: ref }}
                                                    label="Nhập mật khẩu cũ"
                                                    variant="outlined"
                                                    sx={{ width: '450px' }}
                                                    InputProps={{ inputProps: { min: 6, max: 60 } }}
                                                />
                                            )}
                                            name='passwordOld'
                                        />
                                        {errors?.passwordOld?.type === "required" && (
                                            <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng tài khoản! </p>)}
                                    </div>
                                    <div>
                                        <Controller
                                            control={control}
                                            defaultValue={null}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { ref, ...rest } }) => (
                                                <TextField
                                                    {...rest}
                                                    _props={{ inputRef: ref }}
                                                    label="Nhập mật khẩu mới"
                                                    variant="outlined"
                                                    type='password'
                                                    sx={{ width: '450px' }}
                                                    InputProps={{ inputProps: { min: 6, max: 60 } }}
                                                />
                                            )}
                                            name='inputPassword'
                                        />
                                        {errors?.inputPassword?.type === "required" && (
                                            <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập mật khẩu! </p>)}
                                    </div>
                                    <div>
                                        <Controller
                                            control={control}
                                            defaultValue={null}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { ref, ...rest } }) => (
                                                <TextField
                                                    {...rest}
                                                    _props={{ inputRef: ref }}
                                                    label="Nhập lại mật khẩu mới"
                                                    variant="outlined"
                                                    type='password'
                                                    sx={{ width: '450px' }}
                                                    InputProps={{ inputProps: { min: 6, max: 60 } }}
                                                />
                                            )}
                                            name='inputConfirmPassword'
                                        />
                                        {errors?.inputConfirmPassword?.type === "required" && (
                                            <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập lại mật khẩu! </p>)}
                                    </div>
                                </div>
                            </TabPanel>
                        </Box>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Button
                                className={classes.button}
                                style={{
                                    width: '80%',
                                    backgroundColor: '#333333',
                                    color: '#FFFFFF',
                                    height: '38px',
                                    fontWeight: '500',
                                    fontSize: '14'
                                }}
                                type="submit"
                            >
                               Đổi mật khẩu
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChangePass