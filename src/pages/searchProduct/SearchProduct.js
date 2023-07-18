/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { IconShop, IconUser, IconSearch, IconDown, IconRight, IconShopFm } from "../../assets/icons/list-Icon";
import styles from './Category.module.scss'
import { LaptopAcer, Pngwing1, Pngwing2, Pngwing3, Pngwing4, Pngwing5, Pngwing6 } from "../../assets/images";
import { Autocomplete, TextField } from "@mui/material";
import Header from "../../components/Header/Header";
import { useDispatch } from 'react-redux';
import ProductAction from "../../redux/product/action";
import useRouter from "../../hooks/use-router";

function Category(props) 
{
    const router = useRouter();
    const dispatch = useDispatch()
    const [listProduct, setListProduct] = useState([]);
    const [ param, setParam ] = useState(0);
    useEffect(() => {
        let params = { ...router.getAll() };
        dispatch({
            type: ProductAction.GET_LIST_PRODUCT_BY_CATEGORY,
            data: { idCategory: params?.cate },
            onSuccess: (data) => {
                setListProduct(data?.data?.result)
            },
        })
    }, [param])
    let paramsshow= { ...router.getAll() };

    return (
        <div className={styles.shopOnlineMain}>
            <Header onchange={setParam}/>
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
                    Laptop {paramsshow?.nCt}
                </div>
            </div>
            <div className={styles.laptopTitle}>
                <div style={{ minWidth: 400 }}>
                    Laptop {paramsshow?.nCt}
                </div>
                <div className={styles.laptopSearch}>
                    <Autocomplete 
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
                        renderInput={(params) => <TextField {...params} label="Sản phẩm mới" />}
                    />
                    <Autocomplete 
                        disablePortal
                        id="combo-box-demo"
                        options={[
                            {
                                key: 1,
                                label: 'Giá từ thấp đến cao'
                            },
                            {
                                key: 2,
                                label: 'Giá từ cao đến thấp'
                            }
                        ]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Giá từ thấp đến cao" />}
                    />
                </div>
                
            </div>
            <div className={styles.laptopList}>
                {
                listProduct?.map( item =>  {
                    return (
                    <div className={styles.itemLaptop} 
                        onClick={() => {
                            let params = { ...router.getAll() };
                            router.push({
                                pathname: '/category/detail-laptop',
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
                            
                            }}
                            />
                        <div>
                            {item?.name}
                        </div>
                        <div className={styles.priceItem}>
                            <div className={styles.price}>
                                {item?.price} đ
                            </div>
                            <IconShopFm />
                        </div>
                        <div className={styles.productDetail}>
                            <div className={styles.itemDetail}>
                                <div className={styles.item}>
                                    <img src={Pngwing1} style={{ width: 17, height: 17 }}/>
                                    <div>R5 5500U</div>
                                </div>
                                <div className={styles.item}>
                                    <img src={Pngwing4} style={{ width: 17, height: 17  }}/>
                                    <div>GTX 1650</div>
                                </div>
                            </div>
                            <div className={styles.itemDetail}>
                                <div className={styles.item}>
                                    <img src={Pngwing6} style={{ width: 17, height: 17  }}/>
                                    <div>DDR4 8GB</div>
                                </div>
                                <div className={styles.item}>
                                    <img src={Pngwing2} style={{ width: 17, height: 17  }}/>
                                    <div>256GB</div>
                                </div>
                            </div>
                            <div className={styles.itemDetail}>
                                <div className={styles.item}>
                                    <img src={Pngwing5} style={{ width: 17, height: 17 }}/>
                                    <div>2.1 kg</div>
                                </div>
                                <div className={styles.item}>
                                    <img src={Pngwing3} style={{ width: 17, height: 17  }}/>
                                    <div>15.6” FHD 60Hz</div>
                                </div>
                            </div>
                        </div>
                    </div>)
                })
                }
            </div>
            
        </div>
        
    )
}

export default Category