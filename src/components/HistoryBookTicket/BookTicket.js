import React from "react";
import styles from './BookTicket.module.scss'
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
import NotFound from "../../pages/404/NotFound";
import Cookies from "js-cookie";
import LoginAction from "../../redux/login/action";

function BookTicket() {
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
        <div className={styles.bookticket}>
            <div>
                <div style={{
                    display: "flex",
                    gap: '20px',
                    marginTop: '15px',
                    width: '60%',
                    marginLeft: '10%'
                }}>
                    <div className={styles.rightpage}>
                        <div>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example" textColor="inherit" indicatorColor="secondary" variant="fullWidth"
                                style={{
                                    width: '100%'
                                }}
                            >
                                <Tab
                                    onClick={(e) => {
                                        router.push({
                                        pathname: RouterPath.BOOKING_PAGE,
                                        });
                                    }}
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
        </div>
    )
}
export default BookTicket;