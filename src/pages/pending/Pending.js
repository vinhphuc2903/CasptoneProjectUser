import React from "react";
import styles from './Pending.module.scss'
import Header from "../../components/Header/Header";
import { IconRight, IconAvatar } from "../../assets/icons/list-Icon";
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import OrderTable from "../../components/Order/OrderTable/OrderTable";
import { useDispatch } from 'react-redux';
import OrderAction from "../../redux/order/action";
import useRouter from "../../hooks/use-router";
import * as RouterPath from '../../router/RouterPath'
import { ToastContainer } from "react-toastify";
import Utils from "../../utils/Utils";
import NotFound from "../404/NotFound";
import Cookies from "js-cookie";
import LoginAction from "../../redux/login/action";

function Pending() {
    const [value, setValue] = React.useState('one');

    const [cart, setCart] = React.useState([]);

    const router = useRouter();

    const dispatch = useDispatch()

    let params = { ...router.getAll() };

    const [isLogin, setIsLogin] = React.useState(true);

    const handleGetOrder = () => {
        dispatch({
            type: OrderAction.GET_LIST_ORDER_BY_USERID,
            onSuccess: (data) => {
                setCart(data?.data?.result?.result)
            },
            // onError: (data) => {
            //     Utils.showErrorToast({
            //         message: "Vui lòng đăng nhập để tiếp tục",
            //     })
            //     setIsLogin(false)
            // },
        })
    }
    React.useEffect(() => {
        handleGetOrder()
        getUserData()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [ dataName, setName ]= React.useState('');

    const getUserData = async () => {
        dispatch({
            type: LoginAction.GET_USER_DETAIL,
            onSuccess: (data) => {
                const datax = data?.data?.result
                setName(datax?.firstName ?? '' + ' ' + (datax?.lastName ?? ''))
            }
        })
    }

    return (
        <div className={styles.pending}>
            <ToastContainer />
            <Header />
            {!isLogin ? <NotFound /> : 
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
                    gap: '20px',
                    marginTop: '15px',
                    marginLeft: '10%'
                }}>
                    <div className={styles.infomain}>
                        <div className={styles.avatar}>
                            <IconAvatar />
                            <p>{dataName}</p>
                        </div>
                        <div className={styles.infoItems}>
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: "ButtonHighlight" }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                    </ListSubheader>
                                }
                            >
                                
                            </List>
                            <ListItemButton
                                onClick={(e) => {
                                    router.push({
                                        pathname: RouterPath.ACCOUNT,
                                    })
                                }}
                            >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Thông tin cá nhân" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{
                                    backgroundColor: '#c9c9d0'
                                }}
                            >
                                <ListItemIcon>
                                    <ShoppingBasketIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Quản lý đơn hàng" 
                                />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    onClick={() => {
                                        router.push({
                                            pathname: '/changepass'
                                        })
                                    }} 
                                    primary="Đổi mật khẩu" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText
                                    onClick={() => {
                                        Cookies.remove('userPBL6')
                                        Cookies.remove('token')
                                        // router.push({
                                        //     pathname: '/login',
                                        // })
                                        window.location = '/login'
                                    }}
                                    primary="Đăng xuất"

                                />
                            </ListItemButton>
                        </div>
                        </div>
                        <div className={styles.rightpage}>
                            <div>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example" textColor="inherit" indicatorColor="secondary" variant="fullWidth"
                                    style={{
                                        width: '800px'
                                    }}
                                >
                                    <Tab
                                        value="one"
                                        label="Lịch sử đặt vé"
                                    />
                                </Tabs>
                            </div>
                            { (cart?.length === 1 && cart[0]?.addressId === null ) && 
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '800px',
                                    color: '#123232',
                                    fontSize: '32px'
                                }}
                            >
                                Danh sách trống !
                            </div>}
                            <div>
                                <OrderTable 
                                    data={cart}
                                    isShowDelete
                                    isShowTable={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default Pending;