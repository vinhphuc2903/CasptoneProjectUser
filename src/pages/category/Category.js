/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { IconRight, IconShopFm } from "../../assets/icons/list-Icon";
import styles from './Category.module.scss'
import { Pngwing1, Pngwing2, Pngwing3, Pngwing4, Pngwing5, Pngwing6 } from "../../assets/images";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import Header from "../../components/Header/Header";
import { useDispatch } from 'react-redux';
import ProductAction from "../../redux/product/action";
import useRouter from "../../hooks/use-router";
import convertStringToNumber from "lib-pbl6"
import CartAction from "../../redux/cart/action";
import Utils from "../../utils/Utils";
import * as RouterPath from "../../router/RouterPath";
import { Tooltip } from "@mui/material";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
  } from "@material-ui/core/styles";
import Footer from "../../components/Footer/Footer";

function Category(props) 
{
    const router = useRouter();
    const dispatch = useDispatch()
    const [listProduct, setListProduct] = useState([]);
    const BlueOnGreenTooltip = withStyles({
        tooltip: {
          color: "lightblue",
          backgroundColor: "red",
          border: '1px solid #332122'
        }
      })(Tooltip);

    const [ param, setParam ] = useState(0);
    const editData = (data) => {
        data?.map((datax) => {
            datax?.detailProduct?.split('//')?.map(item => {
                var it = item?.split('/')
                if(it[0] === 'DPG')
                {
                    datax.DPG = it[1];
                }  
                else if (it[0] === 'Monitor')
                {
                    datax.Monitor = it[1]
                }
                else if (it[0] === 'Ram')
                {
                    datax.Ram = it[1]
                }
                else if (it[0] === 'Chip')
                {
                    datax.Chip = it[1]
                }
                else if (it[0] === 'Card')
                {
                    datax.Card = it[1]
                }
                else if (it[0] === 'HardDrive')
                {
                    datax.HardDrive = it[1]
                }
            })
        })
        return data
    }
    const addProductToCart = (idPrd) => {
        let params = { ...router.getAll() };
        dispatch({
            type: CartAction.ADD_TO_CART,
            data: 
                { 
                    productId: idPrd,
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

    const getData = async (value, sortBy) => {
        let params = { ...router.getAll() };

        dispatch({
            type: ProductAction.GET_LIST_PRODUCT_BY_CATEGORY,
            data: { 
                idCategory: params?.cate,
                Filter: value ?? params?.nCtx,
                sortOrder: sortBy
            },
            onSuccess: (data) => {
                setListProduct(editData(data?.data?.result?.items))
            },
        })
    }
    const onChangeSearch = (value) => {
        getData(value)
    }
    useEffect(() => {
        getData()
    }, [param])

    let paramsshow= { ...router.getAll() };

    return (
        <div className={styles.shopOnlineMain}>
            <Header onchange={setParam} onChangeSearch={onChangeSearch}/>
            <div className={styles.mainLaptop}>
                <div
                    onClick={e => {
                        window.location = '/'
                    }}
                    className={styles.header}
                >
                    Trang chủ
                </div>
                <IconRight />
                <div>
                    {paramsshow?.nCt}
                </div>
            </div>
            <div className={styles.laptopTitle}>
                <div style={{ minWidth: 400 }}>
                    {paramsshow?.nCt}
                </div>
                <div className={styles.laptopSearch}>
                    {/* <Autocomplete 
                        disablePortal
                        id="combo-box-demo"
                        // className={styles.laptopSearchNew}
                        sx={{ width: 300 }}
                        options={[
                            {
                                key: 1,
                                label: 'Sản phẩm mới nhất'
                            },
                            {
                                key: 2,
                                label: 'Sản phẩm cũ nhất'
                            }
                        ]}
                        onChange={(e, value) => {
                            getData(null, value?.key)
                        }}
                        renderInput={(params) => <TextField {...params} label="Sản phẩm mới" />}
                    /> */}
                    {listProduct?.length !== 0 &&
                        <Autocomplete 
                            disablePortal
                            id="combo-box-demo"
                            options={[
                                {
                                    key: 1,
                                    label: 'Sản phẩm mới nhất'
                                },
                                {
                                    key: 2,
                                    label: 'Sản phẩm cũ nhất'
                                },
                                {
                                    key: 3,
                                    label: 'Giá từ thấp đến cao'
                                },
                                {
                                    key: 4,
                                    label: 'Giá từ cao đến thấp'
                                }
                            ]}
                            sx={{ width: 300 }}
                            onChange={(e, value) => {
                                getData(null, value?.key)
                            }}
                            renderInput={(params) => <TextField {...params} label="Sắp xếp theo" />}
                        />}
                </div>
                
            </div>
            {listProduct?.length === 0 &&
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        minHeight: '100%',
                        fontSize: '22px',
                        fontWeight: '600',
                        color: 'red',
                        marginTop: '20px',
                        marginBottom: '500px'
                    }}
                >
                    Không tìm thấy sản phẩm!
                </div>
            }
            <div className={styles.laptopList}>
                {
                listProduct?.map( item =>  {
                    return (
                    <div className={styles.itemLaptop} >
                        <div
                            style={{ 
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                let params = { ...router.getAll() };
                                router.push({
                                    pathname: RouterPath.DETAIL_LAPTOP,
                                    params: {
                                        ...params,
                                        prd: item.id,
                                    }
                                })
                            } }
                        >
                            <img 
                                src={item?.avtImageUrl}
                                style={{ 
                                    width: 295,
                                    height: 265,
                                    cursor: 'pointer'
                                }}
                               
                            />
                            <div
                                style={{
                                    maxHeight: '100px',
                                    minHeight: '100px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {item?.name}
                            </div>
                        </div>
                        <div className={styles.priceItem}>
                            <div className={styles.price}>
                                {convertStringToNumber(item?.price?.toString(), true)}
                            </div>
                            <BlueOnGreenTooltip 
                                title='Mua ngay'
                                
                            >
                                <IconButton
                                    onClick={() => {
                                        addProductToCart(item?.id)
                                    }}
                                >
                                    <IconShopFm />
                                </IconButton>
                            </BlueOnGreenTooltip>
                        </div>
                        <div className={styles.productDetail}>
                            <div className={styles.itemDetail}>
                                <div className={styles.item}>
                                    <img src={Pngwing1} style={{ width: 17, height: 17 }}/>
                                    <div>{item?.Chip ?? 'Hiệu năng cao'}</div>
                                </div>
                                <div className={styles.item}>
                                    <img src={Pngwing4} style={{ width: 17, height: 17  }}/>
                                    <div>{item?.Card ?? 'Đồ họa cao'}</div>
                                </div>
                            </div>
                            <div className={styles.itemDetail}>
                                <div className={styles.item}>
                                    <img src={Pngwing6} style={{ width: 17, height: 17  }}/>
                                    <div>{item?.Ram ?? 'Dung lượng cao'}</div>
                                </div>
                                <div className={styles.item}>
                                    <img src={Pngwing2} style={{ width: 17, height: 17  }}/>
                                    <div>{item?.HardDrive  ?? 'Dung lượng cao'}</div>
                                </div>
                            </div>
                            <div className={styles.itemDetail}>
                                <div className={styles.item}>
                                    <img src={Pngwing5} style={{ width: 17, height: 17 }}/>
                                    <div>{item?.weight} kg</div>
                                </div>
                                <div className={styles.item}>
                                    <img src={Pngwing3} style={{ width: 17, height: 17  }}/>
                                    <div>{item?.Monitor  ?? 'Màn hình full hd'} {item?.DPG}</div>
                                </div>
                            </div>
                        </div>
                    </div>)
                })
                }
            </div>
            {listProduct?.length !== 0 && <Footer />  }
        </div>
        
    )
}

export default Category