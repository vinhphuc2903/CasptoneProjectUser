/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './BookingPage.module.scss'
import Header from "../../components/Header/Header";
import { ToastContainer } from 'react-toastify';
import ListChair from "../../components/ListChair/ListChair";
import { IconVipChair, IconSoldChair, IconDoubleChair, IconRegularChair, IconSelectedChair } from "../../assets/icons/list-Icon";
import convertStringToNumber from "lib-pbl6"
import { Button } from "@mui/material";
import * as RouterPath from "../../router/RouterPath"
import useRouter from "../../hooks/use-router";
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import TableBooking from "./components/TableBooking/TableBooking";
import OrderAction from "../../redux/order/action";

function BookingPage(props) 
{ 
    const { 
        //ticket
        listChairChose,
        setListChairChose = () => {}
    } = props
    const dispatch = useDispatch()
    const listOrder = useSelector((state) => state?.Order);
    const router = useRouter()
    const getListOrder = async() => {
        dispatch({
            type: OrderAction.GET_LIST_ORDER_BY_USERID,
            onSuccess: (data) => {
                // setListProduct(data?.data?.result)
            },
        })
    }   
    let params = { ...router.getAll() };
    useEffect(() => {
        getListOrder()
    }, [])
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.bookingPage}>
            <div className={styles.contentMain}>
            <Header />
                <div className={styles.choseChair} style={{ color: '#e9ecef'}}>
                    <div className={styles.chair}>
                        Lịch Sử Giao Dịch Online
                    </div>
                    <div>
                        <TableBooking dataList={listOrder?.listOrder} paging={listOrder?.paging} tableName='Danh sách giao dịch'/> 
                    </div>
                </div>
            </div>
            {/* <div
                className={styles.footer}
            >
                <div
                    className={styles.cairNote}
                >
                    CHÚ THÍCH GHẾ
                    <div className={styles.listNoteChair}>
                        <div className={styles.listNoteChairLeft}>
                            <div>
                                <IconRegularChair />
                                : Ghế thường
                            </div>
                            <div>
                                <IconVipChair />
                                : Ghế vip
                            </div>
                            <div>
                                <IconDoubleChair />
                                : Ghế dôi
                            </div>
                        </div>
                        <div className={styles.listNoteChairRight}>
                            <div>
                                <IconSelectedChair />
                                : Ghế đang chọn
                            </div>
                            <div>
                                <IconSoldChair />
                                : Ghế đã bán
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.itemRight}>
                    <div>
                        <div>
                            GHẾ ĐÃ CHỌN
                            <div className={styles.itemChairChose}>
                                {listChairChose?.map((item, index) => (
                                    <div style={{ minWidth: '65px'}} className={styles.textdata}>
                                        {index < 1 ? item?.name : `, ${item?.name}` }
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            TỔNG GIÁ VÉ
                            <div className={styles.textdata}>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divbutton}>
                        <Button 
                            variant="text" 
                            className={styles.buttonNext}
                            onClick={(e) => {
                                // router.push({
                                //     pathname: RouterPath.CORN_WATER_PAGE
                                // })
                                var searchData = `?page=2&ids=${params?.ids}`;
                                router.replace(searchData)
                                // setPage(2)
                            }}
                        >
                            Tiếp theo
                        </Button>
                    </div>
                    
                </div>
            </div> */}
        </div>
    )
}

export default BookingPage
