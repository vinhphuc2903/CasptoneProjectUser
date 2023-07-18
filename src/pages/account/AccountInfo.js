import React from "react";
import Header from "../../components/Header/Header";
import styles from './AccountInfo.module.scss'
import { IconRight } from "../../assets/icons/list-Icon";
import BookTicket from "../../components/HistoryBookTicket/BookTicket";
import { useForm, Controller } from 'react-hook-form';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import LoginAction from "../../redux/login/action";
import Utils from "../../utils/Utils";
import { ToastContainer } from "react-toastify";
import useRouter from "../../hooks/use-router";
import ImagePicker from "../../components/common/image-up-loading/ImageUpLoading";
import InforAccount from "../../components/Info/InfoAccount";
// import { Cookies } from 'react-cookie';
import * as RouterPath from "../../router/RouterPath"

function AccountInfo() {
    // const cookies = new Cookies();
    const dispatch = useDispatch()
    const router = useRouter();

    const [ page, setPage ] = React.useState(0);
    
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm()

    // const handleSubmitData = async (data) => {
    //     dispatch({
    //         type: LoginAction.CHANGE_PROFILE,
    //         data: data,
    //         onSuccess: () => {
    //             Utils.showSuccessToast({
    //                 message: "Sửa thông tin thành công",
    //             })
    //             getUseInfor()
    //         },
    //         onError: (data) => {
    //             Utils.showErrorToast({
    //                 message: data,
    //             })
    //         }
    //     })
    // }

    const isValidPhone = (value) =>
        ( value &&
        !/(090|093|070|072|079|077|076|078|089|088|091|094|083|084|085|081|082|032|033|034|035|036|037|038|039|086|096|097|098|099|059|092|052|056|058)+([0-9]{7})\b/i.test(
        value, ) ? 'Số điện thoại không hợp lệ'
        : undefined
    )
    const isValidEmail = email =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

    const handleEmailValidation = email => {
        const isValid = isValidEmail(email);
        return isValid;
    };

    const handlePhoneValidation = phone => {
        const isValid = isValidPhone(phone);
        return isValid;
    };
    

    // onSubmit={handleSubmit(onSubmit)}>
    return (
        <div className={styles.accountInfoContente} >  
            <ToastContainer />
            <div className={styles.accountInfo}>
                <Header />
                    <div>
                        <div className={styles.tiltleReturn}>
                    <div
                        onClick={e => {
                            window.location = '/'
                        }}
                        className={styles.header}
                    >
                            Trang Chủ
                        </div>
                        <IconRight />
                        Tài khoản
                    </div>
                    <div style={{
                        display: "flex",
                        gap: "30px",
                        marginLeft: '10%',
                        marginTop: '15px'
                    }}>
                        <div className={styles.infomain}>
                            <div className={styles.avatar}>
                                <ImagePicker
                                    sx={{
                                        maxWidth: '120px',
                                        maxHeight: '120px'
                                    }}
                                    width={100}
                                    height={100}
                                    defaultValue={'https://cdn.onlinewebfonts.com/svg/img_569204.png'}
                                />
                                {/* <p>{userInfo?.firstName ?? '' + " " + (userInfo?.lastName ?? '')}</p> */}
                            </div>
                            <div className={styles.infoItems}>
                                <List
                                    sx={{ width: '100%', bgcolor: "ButtonHighlight" }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                        </ListSubheader>
                                    }
                                ></List>
                                <ListItemButton
                                    sx={{
                                        backgroundColor: `${page == 0 ? '#bb2c2c' : ''}`,
                                        color: `${page == 0 ? 'white' : ''}`

                                    }}
                                    onClick={(e) => {
                                        setPage(0)
                                    }}
                                >
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Thông tin cá nhân" 
                                    />
                                </ListItemButton>
                                <ListItemButton
                                    onClick={(e) => {
                                        router.push({
                                        pathname: RouterPath.BOOKING_PAGE,
                                        });
                                    }}
                                >
                                    <ListItemIcon>
                                        <ShoppingBasketIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Lịch sử đặt vé" />
                                </ListItemButton>
                                <ListItemButton
                                     onClick={() => {
                                        router.push({
                                            pathname: '/changepass'
                                        })
                                    }} 
                                >
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                       
                                        primary="Đổi mật khẩu" />
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() => {
                                        // cookies.removeAll()
                                        const cookies = Object.keys(Cookies.get()); // Get an array of all cookie names
                                        cookies.forEach(cookie => {
                                        Cookies.remove(cookie); // Remove each cookie one by one
                                        });
                                        window.location = '/login'
                                    }} 
                                >
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Đăng xuất" />
                                </ListItemButton>
                            </div>
                        </div>
                        {page == 0 ? 
                            (<InforAccount 
                                control={control}
                                Controller={Controller}
                                errors={errors}
                            />) :
                            (<BookTicket />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AccountInfo;