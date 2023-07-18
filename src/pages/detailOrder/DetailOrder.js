import React from "react";
import styles from './DetailOrder.module.scss'
import Header from "../../components/Header/Header";
import { IconRight, IconAvatar } from "../../assets/icons/list-Icon";
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LogoutIcon from '@mui/icons-material/Logout';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CartTable from "../../components/Cart/CartTable/CartTable";
import { useDispatch } from 'react-redux';
import OrderAction from "../../redux/order/action";
import useRouter from "../../hooks/use-router";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as RouterPath from '../../router/RouterPath'
import Cookies from "js-cookie";
import { ToastContainer } from 'react-toastify';
import Utils from "../../utils/Utils";
import { useForm } from 'react-hook-form'
import LoginAction from '../../redux/login/action'

function createRow(desc, price) {
    return { desc, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}


function DetailOrder() {
    const [value, setValue] = React.useState('one');

    const [cart, setCart] = React.useState();

    const [address, setAddress] = React.useState([]);
    const router = useRouter();
    const dispatch = useDispatch()
    const {
        handleSubmit,
        control,
        getValues,
        formState: { errors }
    } = useForm()

    const [ dataName, setName ]= React.useState('');

    const getUserData = async () => {
        dispatch({
            type: LoginAction.GET_USER_DETAIL,
            onSuccess: (data) => {
                const datax = data?.data?.result
                setName(datax?.firstName + ' ' + datax?.lastName)
            }
        })
    }

    let params = { ...router.getAll() };

    const handleGetCart = () => {
        dispatch({
            type: OrderAction.GET_DETAIL_BY_ID,
            data: { 
                    idOrder: params?.id,
                },
            onSuccess: (data) => {
                setCart(data?.data?.result?.result)
                setAddress(data?.data?.result?.result?.address[0])
            },
        })
    }

    React.useEffect(() => {
        handleGetCart()
        getUserData()
        if(params?.stt !== null && typeof params?.stt !== 'undefined' && params?.stt !== '')
        {
            Utils.showSuccessToast({
                message: `${params?.stt === 'Dtt' ? "Thanh toán thanh toán" : "Thanh toán thất bại"}`,
            })

            router.push({
                params: {
                    idOrder: params?.id,
                }
            })
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(null, newValue);
    };

    const row1 = [
        createRow('Tổng tiền hàng', cart?.total ?? 0),
        createRow('Phí vận chuyển', 30000),
        createRow('Giảm phí vận chuyển', cart?.total ?? 0 > 1000000 ? -30000 : 0),
    ];

    const invoiceSubtotal = subtotal(row1);

    return (
        <div className={styles.pending}>
            <Header />
            <ToastContainer />
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
                marginLeft: '10%',
                gap: '20px',
                marginTop: '15px',
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
                        ></List>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Thông tin cá nhân" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={(e) => {
                                router.push({
                                    pathname: RouterPath.PENDING,
                                })
                            }}
                        >
                            <ListItemIcon>
                                <ShoppingBasketIcon />
                            </ListItemIcon>
                            <ListItemText primary="Quản lý đơn hàng" />
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
                                label="Chi tiết đơn hàng"
                                // label="Chờ xác nhận"
                            />
                          
                        </Tabs>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '20px'
                        }}
                    >
                        <h6>Địa chỉ giao hàng: {address?.address} / {address?.communityName} / {address?.districtName} / {address?.provinceName} </h6>
                        <h6>Số điện thoại: {address?.phone}</h6> 
                        <h6>Trạng thái: { cart?.status === "Shipped" || cart?.payment === "Banking" ? "Đã thanh toán" : "Chưa thanh toán" }</h6>
                    </div>

                    <div>
                        <CartTable 
                            data={cart}
                            disabledBt
                            isShowDelete
                            getValues={getValues}
                            setValue={setValue}
                            control={control}
                        />
                    </div>
                    <div>
                    <div style={{
                        
                        width: 'auto',
                        marginBottom: '20px'
                    }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ 
                                    width: '350px', 
                                    right: '100px',
                                    // bottom: '20px',
                                    position: 'absolute', 
                                    border: '1px solid red',
                                    borderRadius: '10px',
                                    marginBottom: '20px'
                                }} 
                                aria-label="spanning table"
                            >
                                <TableBody>
                                    {row1?.map((row) => (
                                        <TableRow key={row.desc}>
                                            <TableCell>{row.desc}</TableCell>
                                            <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                        </TableRow>
                                    ))}

                                    <TableRow >
                                        <TableCell sx={{ fontWeight: '700' }}>Tổng phí thanh toán</TableCell>
                                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                </div>
            </div>
        </div>

    )
}
export default DetailOrder;