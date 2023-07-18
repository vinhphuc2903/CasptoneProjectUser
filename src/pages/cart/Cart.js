import React, { useEffect} from "react";
import Header from "../../components/Header/Header";
import styles from './Cart.module.scss'
import { IconRight, IconCart } from "../../assets/icons/list-Icon";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CartOrder from "../../components/Cart/CartOrder/CartOrder";
import CartTable from "../../components/Cart/CartTable/CartTable";
import useRouter from "../../hooks/use-router";
import OrderAction from "../../redux/order/action";
import CartAction from "../../redux/cart/action";
import { useDispatch } from 'react-redux';
import Utils from "../../utils/Utils";
import { ToastContainer } from 'react-toastify';
import NotFound from "../404/NotFound";
import { useForm } from 'react-hook-form'

const OrderNull = () => {
    return (
        <div className={styles.emptyCart}>
            <div className={styles.content}>
                <IconCart />
                <div><p>GIỎ HÀNG HIỆN ĐANG TRỐNG</p></div>
                <div>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button style={{
                            width: '279px',
                            backgroundColor: '#F20707',
                            color: '#FFFFFF',
                            marginTop: '20px',
                            height: '58px'
                        }}
                        >
                            VỀ LẠI TRANG CHỦ
                        </Button>
                    </Link>
                </div>
            </div>
        </div>    
    )
}



function Cart() {
    const router = useRouter();
    const [cart, setCart] = React.useState([]);
    let params = { ...router.getAll() };
    const {
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors }
    } = useForm()

    const handleUpdateCart = (data) => {
        dispatch({
            type: CartAction.UPDATE_CART,
            data: data,
            onSuccess: (data) => {
                router.push({
                    pathname: '/payment',
                })
                Utils.showSuccessToast({
                    message: "Tiến hành thanh toán",
                })
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message: "Tiến hành thanh toán thất bại, vui lòng kiểm tra giỏ hàng",
                })
            },
        })
    }

    const onSubmit = (data) => {
        const datax = Object.keys(data).map((item) => {
            if(!item.includes('total'))
            {
                return {
                    productId: item,
                    quantity: data[item],
                    note: ""
                }
            }
        })
        var filtered = datax.filter(function (el) {
            return el != null;
        });
        handleUpdateCart(filtered)

    }
    const handleGetCart = () => {
        dispatch({
            type: OrderAction.GET_ORDER_BY_ID,
            data: { 
                    idOrder: params?.orcd,
                },
            onSuccess: (data) => {
                setCart(data?.data?.result)
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message: "Vui lòng đăng nhập để tiếp tục",
                })
                setIsLogin(false)
            },
        })
    }

    const [isLogin, setIsLogin] = React.useState(true);

    const handleDeteleProduct = (id) => {
        if(id !== null)
        {
            dispatch({
                type: CartAction.DELETE_PRODUCT_TO_CART,
                data: { 
                        idProduct: id,
                        quantity: 1,
                    },
                onSuccess: (data) => {
                    Utils.showSuccessToast({ message: "Đã xóa sản phẩm khỏi giỏ hàng" })
                    handleGetCart()
                },
                onError: () => {
                    Utils.showErrorToast({ message: "Xóa sản phẩm thất bại"} )
                }
            })
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {
        if(params?.orcd !== null && typeof params?.orcd !== 'undefined')
        {
            Utils.showSuccessToast({ message: "Thêm sản phẩm vào giỏ hàng thành công"} )
            router.push({
                pathname: '/cart'
            })
        }
        handleGetCart()
    }, [])
    
    const [ valueTotal, setTotal ] = React.useState()
    const setValueTotal = (value) => {
        setTotal(value)
    }
    React.useEffect(() => {
        setTotal(cart?.total)
    }, [cart?.total])
    
    return (
        <form className={styles.cart}  onSubmit={handleSubmit(onSubmit)}> 
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
                    Giỏ hàng
                </div>
                {   cart?.list?.length === 0 ? <OrderNull /> :
                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        <CartOrder />
                    </div>
                    <h3 style={{ marginLeft: "200px" }}>GIỎ HÀNG (1)</h3>
                    <div 
                        style={{ 
                            marginLeft: "200px", 
                            marginBottom: "50px",
                            display: "flex",
                            flexDirection: "column",
                            gap: '20px'
                    }}>
                        <CartTable 
                            data={cart}
                            setValueTotal={setValueTotal}
                            valueTotal={valueTotal}
                            getValues={getValues}
                            setValue={setValue}
                            handleDeteleProduct={handleDeteleProduct}
                            control={control}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginRight: '100px'
                            }}
                        >
                        <div style={{
                            bottom: '30px',
                            right: '30px',
                            width: '313px',
                            border: '0.2px solid rgba(0, 0, 0, 0.22)',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            paddingBottom: '20px'
                        }}>
                            <div style={{ 
                                marginTop: '20px',
                                marginLeft: '40px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <div
                                    style={{
                                        fontSize: '20px'
                                    }}
                                >
                                    Phí vận chuyển: {valueTotal > 1000000 ? 0 : 300000} đ
                                </div>
                                <div
                                    style={{
                                        fontSize: '20px'
                                    }}
                                >
                                    Tổng tiền: {valueTotal} đ
                                </div>
                            </div>
                            <button 
                                type='submit'
                                style={{
                                    width: '261px',
                                    height: '33px',
                                    left: '916px',
                                    top: '338px',
                                    backgroundColor: '#E50000',
                                    borderColor: 'red',
                                    borderRadius: '10px',
                                    marginTop: '20px', 
                                    marginLeft: '25px',
                                    color: '#ffffff',
                                }}
                            >
                                TIẾN HÀNH ĐẶT HÀNG
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                }
            </div>
            }
        </form>
    )
}
export default Cart;