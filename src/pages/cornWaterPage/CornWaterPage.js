/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './CornWaterPage.module.scss'
import Header from "../../components/Header/Header";
import { ToastContainer } from 'react-toastify';
import ListChair from "../../components/ListChair/ListChair";
import { IconVipChair, IconSoldChair, IconDoubleChair, IconRegularChair, IconSelectedChair } from "../../assets/icons/list-Icon";
import convertStringToNumber from "lib-pbl6"
import { Button } from "@mui/material";
import FoodAndDrink from "../../components/FoodAndDrink/FoodAndDrink";
import * as RouterPath from "../../router/RouterPath"
import useRouter from "../../hooks/use-router";
import OrderAction from "../../redux/order/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Utils from "../../utils/Utils";
import getErrorMessage from "../../utils/ErrorConstant";

function CornWaterPage(props) 
{ 
    const { listOption, setListOption, total, setTotal } = props
    const dispatch = useDispatch();
    const listData = useSelector((state) => state?.Order?.listFood);
    const handleIncreaseTotal = (value, optionName, optionId, quantity) => {
        setTotal(total + value) 
        const item = listOption.find(item => item.Id == optionId)
        if(item)
        {
            item.Quantity++;
        } else {
            setListOption([...listOption, { Id: optionId, Name: optionName, Quantity: quantity}])
        }
    }
    const handleDecreaseTotal = (value, optionName, optionId, quantity) => {
        setTotal(total - value)
        const item = listOption.find(item => item.Id == optionId)
        if(item)
        {
            item.Quantity--;
        }
        if(item.Quantity == 0)
        {
            setListOption(listOption.filter(item => item?.Id != optionId))
        }
    }
    const router = useRouter();
    let params = { ...router.getAll() };

    const handleGetFood = () => {
        dispatch({
            type: OrderAction.GET_FOOD,
        })
    }
    useEffect(() => {
        handleGetFood()
    }, [])
    return (
        // eslint-disable-next-line no-unreachable
            <div className={styles.CornWaterPage}>
                <ToastContainer />
                <div className={styles.contentMain}>
                    <Header />
                    <div className={styles.choseChair}>
                        <div className={styles.chair}>
                            Bước 2: Chọn Bắp Nước
                        </div>
                        <div className={styles.foodAndDrk}>
                            {listData?.map((item, index) => (
                                <FoodAndDrink 
                                    item={item} 
                                    handleIncreaseTotal={handleIncreaseTotal}
                                    handleDecreaseTotal={handleDecreaseTotal}
                                />
                            ))}
                            <div style={{ minWidth: '340px' }}></div>
                        </div>
                    </div>
                </div>
                <div
                        className={styles.footer}
                    >
                        <div
                            className={styles.cairNote}
                        >
                            COMBO ĐÃ CHỌN
                            <div className={styles.listNoteChair}>
                                {listOption?.map((item) => (
                                    <div className={styles.noteShow}>
                                        <div id={item?.id}>
                                            {item?.Name}
                                        </div>   
                                        <div id={item?.id}>
                                            : {item?.Quantity}
                                        </div>   
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.itemRight}>
                            <div>
                                <div>
                                    THÀNH TIỀN
                                    <div className={styles.textdata}>
                                        {convertStringToNumber((total).toString())} VNĐ
                                    </div>
                                </div>
                            </div>
                            <div className={styles.divbutton}>
                                <Button 
                                    variant="text" 
                                    className={styles.buttonNext}
                                    onClick={(e) => {
                                        var searchData = `?page=3&ids=${params?.ids}`;
                                        router.replace(searchData)
                                    }}
                                >
                                    Tiếp theo
                                </Button>
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default CornWaterPage

