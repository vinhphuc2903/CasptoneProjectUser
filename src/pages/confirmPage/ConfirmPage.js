/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './ConfirmPage.module.scss'
import Header from "../../components/Header/Header";
import { ToastContainer } from 'react-toastify';
import convertStringToNumber from "lib-pbl6"
import { Button } from "@mui/material";
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import useRouter from "../../hooks/use-router";
import { useDispatch } from 'react-redux';
import moment from "moment";
import { useSelector } from "react-redux";
import OrderAction from "../../redux/order/action";
import * as RouterPath from "../../router/RouterPath"
import Utils from "../../utils/Utils";

function formatNumber(num = 0) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num.toLocaleString();
    }
}

function ConfirmPage(props) 
{ 
    const { listChairChose, listOption, handleCreateOrder, handlePaymentOrder, total} = props

    const [detailShow, setDetailShow] = useState()
    const user = useSelector((state) => state?.Login?.userLogin);
    const [timeLeft, setTimeLeft] = useState(
        localStorage.getItem('timeLeft') || 300
    );
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem('timeLeft', timeLeft);
    }, [timeLeft]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);
    const minutes = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;

    const getDetailShowTime = async(ids) => {
        dispatch({
            type: OrderAction.GET_SHOWTIME,
            params: {Id: ids},
            onSuccess: (data) => {
                if(data?.data?.showTimeDatas.length != 0)
                {
                    setDetailShow(data?.data?.showTimeDatas[0])
                }
            },
        })
    } 

    let params = { ...router.getAll() };
    useEffect(() => {
        //giải mã
        if(typeof params?.ids != 'undefined')
        {
            const ids = AES.decrypt(params?.ids, 'ids').toString(CryptoJS.enc.Utf8);
            getDetailShowTime(ids)
            if(listChairChose.length == 0)
            {
                var searchData = `?page=1&ids=${params?.ids}`;
                router.replace(searchData)
                Utils.showSuccessToast({
                    message: "Vui lòng chọn vé xem phim để tiếp tục",
                });
            }
        }
    }, [])
    // Tính tổng tiền ghế
    const calculateTotalPrice = () => {
        let sum = 0;

        if (listChairChose) {
        listChairChose.forEach((item) => {
            const price = parseFloat(item.price);
            if (!isNaN(price)) {
            sum += price;
            }
        });
        }

        return sum;
    };    
    var totalData = user.point >= 1000 ? 97 : user.point >= 3000 ? 95 : user.point >= 10000 ? 90 : 100
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.ConfirmPage}>
            <ToastContainer />
            <div className={styles.contentMain}>
                <Header />
                <div className={styles.choseChair}>
                    <div className={styles.chair}>
                        Bước 3: Xác nhận thông tin
                        <div className={styles.contentdata}>
                            {/* {minutes}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft} */}
                        </div>
                    </div>
                    <div className={styles.foodAndDrk}>
                        <div className={styles.infoData}>
                            - Thông tin người mua
                        </div>
                        <div className={styles.detailInfoData}>
                            <div>
                                Người nhận : {user?.name}
                            </div>
                            <div>
                                Email: {user?.email}
                            </div>
                            <div>
                                Số điện thoại: {user?.phone}
                            </div>
                            <div>
                                Hạng: {user?.rank}
                            </div>
                            <div>
                                Điểm đã có: {user?.point}
                            </div>
                        </div>
                    </div>
                    <div className={styles.foodAndDrk}>
                        <div className={styles.infoData}>
                            - Thông tin vé
                        </div>
                        <div className={styles.detailInfoData}>
                            <div>
                                Rạp : {detailShow?. branchName}
                            </div>
                            <div>
                                {/* Tên phim: {detailShow?.} */}
                            </div>
                            <div>
                                Suất chiếu: {`${formatNumber(detailShow?.fromHour)} : ${formatNumber(detailShow?.fromMinus)}`} -  {`${formatNumber(detailShow?.toHour)} : ${formatNumber(detailShow?.toMinus)}`}
                            </div>
                            <div>
                                Ngày chiếu: {moment(detailShow?.dateShow).format('DD/MM/YYYY')}
                            </div>
                            <div className={styles.chairData}>
                                SỐ GHẾ: {listChairChose?.length}
                            </div>
                            <div className={styles.chairChose}>
                                {listChairChose?.map(item => (
                                    <div className={styles.numberChair}>
                                        <div className={styles.chairDetail}>
                                            <div>
                                                {item?.name}: 
                                            </div>
                                            <div>
                                                {convertStringToNumber((item?.price).toString())} VNĐ
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                Tổng tiền ghế: {convertStringToNumber(calculateTotalPrice().toString())} VNĐ
                            </div>
                        </div>
                    </div>
                    <div className={styles.foodAndDrk}>
                        <div className={styles.infoData}>
                            - Thông tin combo
                        </div>
                        <div className={styles.detailInfoData}>
                            <div>
                                Số lượng combo: {listOption?.length} | Tổng tiền combo: {convertStringToNumber(total.toString())} VNĐ
                            </div>
                            <div>
                                Tổng tiền thanh toán: {convertStringToNumber(total.toString())} VNĐ
                            </div>
                        </div>
                    </div>
                    <div className={styles.foodAndDrk}>
                        <div className={styles.infoData}>
                            - Tổng tiền thanh toán
                        </div>
                        <div className={styles.detailInfoData}>
                            <div>
                                Tổng tiền: {convertStringToNumber((total + calculateTotalPrice()).toString())} VNĐ
                            </div>
                            <div>
                                Tổng tiền giảm giá theo thứ hạng:  {convertStringToNumber( Math.round(((total + calculateTotalPrice()) * (100- totalData) / 100) ).toString())} VNĐ
                            </div>
                        </div>
                    </div>
                    <div className={styles.foodAndDrk}>
                        <div className={styles.infoData}>
                            - Hình thức thanh toán
                        </div>
                        <div className={styles.detailInfoData}>
                            <div>
                                VN Pay
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                    className={styles.footer}
                >
                    <div
                        className={styles.cairNote}
                    >
                        {/* COMBO ĐÃ CHỌN
                        <div className={styles.listNoteChair}>
                        
                        </div> */}
                    </div>
                    <div className={styles.itemRight}>
                        <div>
                            <div>
                                THÀNH TIỀN
                                <div className={styles.textdata}>
                                    {convertStringToNumber(Math.round(((total + calculateTotalPrice()) * totalData / 100)).toString())} VNĐ
                                </div>
                            </div>
                        </div>
                        <div className={styles.divbutton}>
                            <Button variant="text" 
                                className={styles.buttonNext} 
                                onClick={(e) => {
                                    handleCreateOrder()
                                }}    
                            >
                                Tạo giao dịch
                            </Button>
                            <Button 
                                variant="text" 
                                className={styles.buttonNextRight}
                                onClick={handlePaymentOrder}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ConfirmPage

