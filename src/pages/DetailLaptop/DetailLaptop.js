/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './DetailLaptop.module.scss'
import Header from "../../components/Header/Header";
import { useDispatch } from 'react-redux';
import ProductAction from "../../redux/product/action";
import CartAction from "../../redux/cart/action";
import Button from '@mui/material/Button';
import useRouter from "../../hooks/use-router";
import Utils from "../../utils/Utils";
import { ToastContainer } from 'react-toastify';
import convertStringToNumber from "lib-pbl6"
import { Fade } from "react-slideshow-image";
import { TextField } from "@mui/material";
import IconAvatar from "../../assets/icons/icon-avatar";
import {IconButton} from "@mui/material";
import { mesageSent } from "../../assets/images";
import CommentAction from "../../redux/comment/action";
import Footer from "../../components/Footer/Footer";

function DetailLaptop(props) 
{
    const dispatch = useDispatch()
    const router = useRouter();
    const [ valueInput, setValueInput ] = React.useState("");
    const [product, setListProduct] = useState([]);
    const [comment, setComment] = useState([]);
    const getProduct = async(prdId) => {
        dispatch({
            type: ProductAction.GET_PRODUCT_BY_ID,
            data: { IdProduct: prdId },
            onSuccess: (data) => {
                setListProduct(data?.data?.result)

            },
        })
    }   
    
    const handleAddComment = async() => {
        let params = { ...router.getAll() };
        if(valueInput?.length > 200 || valueInput?.length < 10 )
        {
            Utils.showErrorToast({
                message: "Vui lòng nhập bình luận từ 10 - 200 kí tự!"
            })
            return
        }
        dispatch({
            type: CommentAction.ADD_COMMENT,
            data: {
                comment: valueInput,
                productId: params?.prd ,
            },
            onSuccess: () => {
                setValueInput('')
                Utils.showSuccessToast({
                    message: "Thêm bình luận thành công",
                })
                getComment(params?.prd)
            },
            onError: () => {
                Utils.showErrorToast({
                    message: "Vui lòng đăng nhập để thêm bình luận"
                })
            }
        })
    }   

    const getComment = async(prdId) => {
        dispatch({
            type: CommentAction.GET_COMMENT,
            param: { idProduct: prdId },
            onSuccess: (data) => {
                setComment(data?.data?.result)
            },
        })
    }   

    useEffect(() => {
        let params = { ...router.getAll() };
        getProduct(params?.prd)
        getComment(params?.prd)
    }, [])

    const dataDetail = product?.detailProduct?.split('//')?.map((item) => {
        var it = item?.split('/')
        var keys = '';
        if(it[0] === 'DPG')
        {
            keys = 'Độ phân giải'
        }  
        else if (it[0] === 'Monitor')
        {
            keys = 'Màn hình'
        }
        else {
            keys = it[0]
        }
        // else if (it[0] === '')
        // {
        //     keys = ''
        // }
        // else if (it[0] === '')
        // {
        //     keys = ''
        // }
        // else if (it[0] === '')
        // {
        //     keys = ''
        // }
        // else if (it[0] === '')
        // {
        //     keys = ''
        // }
        // else if (it[0] === '')
        // {
        //     keys = ''
        // }else if (it[0] === '')
        // {
        //     keys = ''
        // }
        // else if (it[0] === '')
        // {
        //     keys = ''
        // }
        // else if (it[0] === '')
        // {
        //     keys = ''
        // }
        return {
            key: keys,
            value: it[1],
        }
    })
    const addProductToCart = () => {
        let params = { ...router.getAll() };
        dispatch({
            type: CartAction.ADD_TO_CART,
            data: 
                { 
                    productId: params.prd,
                    quantity: 1,
                    note: "",
                },
            onSuccess: (data) => {
                router.push({
                    pathname: '/cart',
                    params: {
                        orcd: data?.data?.result?.id,
                        ...params,
                    }
                })
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message: "Vui lòng đăng nhập để tiếp tục",
                })
            },
        })
    }
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.shopOnlineMain}>
            <ToastContainer />
            <Header />
            <div className={styles.headerContent}>
                <div className={styles.headerTitle}>
                    {product?.name}
                </div>
                <div className={styles.detailProduct}>
                    <div className={styles.imageProduct}>
                        <Fade
                            cssClass="imageList"
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <img 
                                    src={product?.avtImageUrl}
                                    width={350}
                                />
                            </div>
                            {product?.imageUrl?.map((item) => {
                                return (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img 
                                            src={item}
                                            width={350}
                                        />
                                    </div>
                                )
                            })}
                        </Fade>
                        
                    </div>
                    <div className={styles.productSale}>
                        <div className={styles.productPrice}>
                            <div className={styles.productPriceLeft}>
                                <div style={{ fontWeight: 400 }}>
                                    Mua ngay
                                </div>
                                <div className={styles.price}>
                                    {convertStringToNumber((product?.price ?? 0)?.toString(), true)} 
                                </div>
                                <div>
                                    {convertStringToNumber((product?.price * 105 / 100)?.toString(), true)} 
                                </div>
                            </div>
                            <div className={styles.productPriceCenter}>
                                Hoặc
                            </div>
                            <div className={styles.productPriceRight}>
                            <div style={{ fontWeight: 400 }}>
                                   Trả trước từ
                                </div>
                                <div className={styles.price}>
                                    {convertStringToNumber((product?.price ? product?.price * 10 /100  : 0)?.toString(), true)}
                                </div>
                            </div>
                        </div>
                        <div className={styles.productPromotion}>
                            <div>
                                Khuyến mãi                                 
                            </div>
                            <div>
                                Nhận thêm một năm bảo hành  (20/10 - 20/11) tại đây                        
                            </div>
                            <div>
                                Đăng kí nhận gói snapback ADM (20/10 - 20/11) tại đây
                            </div>
                            <div>
                                ♦ Balo Acer Predator SUV.
                            </div>
                            <div>
                                ♦ Bàn phím cơ Predator Aethon 301.
                            </div>
                            <div>
                                ♦ Túi chống sốc.
                            </div>
                        </div>
                        <Button className={styles.buttonDesign}
                            onClick={addProductToCart}
                        >
                            <div className={styles.buyNow}>
                                Đặt ngay
                            </div>
                            <div className={styles.buyNowDetail}>
                                Giao hàng tận nơi hoặc nhận tại cửa hàng
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.mainContentLeft}>
                    <div className={styles.mainContentLeftHeader}>
                        <div>THÔNG SỐ KỸ THUẬT</div>
                    </div>
                    {dataDetail?.map((item) => {
                        if(item?.value !== '' 
                            && typeof item?.key !== 'undefined' 
                            && typeof item?.value !== 'undefined' 
                        )
                        {
                            return (
                            <div>
                                {item?.key} : {item?.value}
                            </div>
                            )
                        }
                    })}
                </div>
                <div className={styles.mainContentRight}>
                    <div className={styles.mainContentRightHeader}>
                        MÔ TẢ SẢN PHẨM
                    </div>
                    <div className={styles.mainContentRightTitle}>
                        <p>
                            {product?.name}
                        </p>
                    </div>
                    <div className={styles.content}>
                        <div
                            style={{
                                maxHeight: '800px'
                            }}
                            dangerouslySetInnerHTML={{__html: product?.description}}
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    marginLeft: '270px',
                    width: '80%'
                }}
            >
                <div
                    style={{
                        fontSize: '22px',
                        fontWeight: '600',
                        marginBottom: '20px'
                    }}
                >
                    Bình luận
                </div>
                <div>
                <TextField
                    label='Mời bạn để lại bình luận... '
                    value={valueInput}
                    onChange={(e) => {
                        setValueInput(e?.target?.value);
                    }}
                    onKeyDown={(e) => {
                        if (e?.keyCode === 13)
                        {
                            handleAddComment()
                        }
                    }}
                    variant="outlined"
                    sx={{ 
                        width: '640px',
                        height: '40px',
                        border: '0px',
                        marginBottom: '40px',
                        padding: '0px'
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={(e) => handleAddComment() }
                                style={{
                                    padding: 0
                                }}
                            >
                                <img 
                                    width={30}
                                    height={30}
                                    src={mesageSent} 
                                    style={{
                                        padding: 0
                                    }}
                                />
                            </IconButton>
                        ),
                        }}
                />
                </div>
                {comment?.map(item => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                marginTop: '20px',
                                marginLeft: '20px',
                                marginBottom: '20px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '50px',
                                    height: '50px'
                                }}
                            >
                                <IconAvatar />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                }}
                            >
                                <div>
                                    {item?.username}
                                </div>
                                <div>
                                    {item?.commentUser}
                                </div>
                            </div>
                        </div>
                        )
                })}
            </div>
            <Footer />
        </div>
        
    )
}

export default DetailLaptop