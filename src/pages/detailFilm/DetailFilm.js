/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './DetailFilm.module.scss'
import Header from "../../components/Header/Header";
import { useDispatch } from 'react-redux';
import useRouter from "../../hooks/use-router";
import * as RouterPath from "../../router/RouterPath"
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import FilmAction from "../../redux/film/action";
import { useSelector } from "react-redux";
import moment from "moment";
import Cookies from 'js-cookie';
import Utils from "../../utils/Utils";

const itemShowTime = (showTime) => {
    return (
        <div
            style={{
                backgroundColor: '#dc5c5c',
                color: 'white',
                padding: '4px 6px',
                width: 'fit-content',
                borer: '1px solid white'
            }}
        >
            {`${formatNumber(showTime?.fromHour)} : ${formatNumber(showTime?.fromMinus)}`}
        </div>    
    )
}
const itemContent = (content) => {
    return (
        <div
            style={{
                backgroundColor: '#dc5c5c',
                color: 'white',
                padding: '4px 6px',
                borderRadius: '5px'
            }}
        >
            {content}
        </div>    
    )
}
function formatNumber(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num.toLocaleString();
    }
}
const FilmItem = (props) => {
    const data = props?.data?.filmInfos
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                minWidth: '100%',
                color: '#e9ecef',
                fontWeight: '600',
                fontSize: '14px',
            }}
        >
            <div style={{ minWidth: '30%', maxWidth: '400px', border: '3px solid #e9ecef' }}>
                <img src={data?.backgroundImage} width = '100%' />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: "column",
                    minWidth: '70%',
                    margin: '20px',
                    gap: '10px',
                }}
            >
                <div style={{ 
                    fontSize: '30px', 
                    // textDecoration: 'line-through',
                    width: 'fit-content',
                    borderBottom: '3px solid #dc5c5c'
                }}>
                    {`${data?.name} (C${data?.ageLimit})`}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px'
                    }}
                >
                    {itemContent("2D")}
                    {itemContent("C18")}
                </div>
                <div>
                    {data?.listTypeFilm?.map((item, index) => {
                        if( index == 0)
                        {
                            return `${item}`
                        } else return `, ${item}`                 
                    })}
                </div>
                <div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <div
                            style={{
                                color: '#e9ecef',
                                fontWeight: '500',
                                paddingRight: '5px'
                            }}
                        >
                            Đạo Diễn:
                        </div>
                        <div>
                            {data?.director}
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <div
                            style={{
                                color: '#e9ecef',
                                fontWeight: '500',
                                paddingRight: '5px'
                            }}
                        >
                            Diễn Viên: 
                        </div>
                        <div>
                            { typeof data?.actor != 'undefined' ? data?.actor : ''}
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        borderTop: '1px dotted rgb(162, 149, 149)',
                        paddingTop: '10px'
                    }}
                >
                    {data?.introduce}
                </div>
            </div>
        </div>    
    )
}
function DetailFilm(props) 
{
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const dispatch = useDispatch()
    const router = useRouter();
    const filmDetail = useSelector((state) => state?.Film?.detailFilm);
    const getDetailFilm = async(id) => {
        dispatch({
            type: FilmAction.GET_DETAIL_FILM,
            params: id,
            onSuccess: (data) => {
                // setListProduct(data?.data?.result)
            },
        })
    }   
    const [dataCookies, setDataCookies] = useState(Cookies.get());
    const token = Cookies.get('token')
    useEffect(() => {
      setDataCookies(Cookies.get());
    }, [token]); 

    useEffect(() => {
        let params = { ...router.getAll() };
        //giải mã
        // eslint-disable-next-line no-undef
        const indx = AES.decrypt(params?.idx, 'idx').toString(CryptoJS.enc.Utf8);
        getDetailFilm(indx)
    }, [])

    var daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

    // Lấy ngày hiện tại
    var now = new Date();

    // Tạo mảng chứa 7 ngày bắt đầu từ ngày hiện tại
    var days = [];
    for (var i = 0; i < 2; i++) {
        var date = new Date(now);
        date.setDate(now.getDate() + i);
        days.push({
            day: daysOfWeek[date.getDay()],
            dateMonth: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() 
        });
    }
    const listLich = [ "10 : 20", "15 : 30", "22 : 30" ]
    
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.detailFilmPage}>
            <div className={styles.headerContent}>
                <Header />
                <div className={styles.filmData}>
                <div>
                    <FilmItem data={filmDetail} />
                </div>
                <div
                    className={styles.showTime}
                >
                    - LỊCH CHIẾU
                </div>
                {filmDetail?.listShowtimeInfo?.map((item) => (
                    <div>
                        <div
                            className={styles.headerMain}
                        >
                            <div className={styles.contentHeader}>
                                {item?.branchesName}
                            </div>
                            <div className={styles.contentHeaderUnder}>
                                {`${item?.branchesName} - ${item?.branchesAddress} - ${item?.branchesCommune} - ${item?.branchesDistrict} - ${item?.branchesProvince}`}
                            </div>
                        </div>
                        <div
                            className={styles.contentMain}
                        >
                            {item?.listShowTimeData?.map((showtime, index) => {
                                return (
                                <div className={styles.contentMainData}>
                                    <div className={styles.contentDate}>
                                        {moment(showtime?.dateShow).format('DD/MM/YYYY')}
                                    </div>
                                    <div className={styles.contentShow}>
                                        {showtime?.showTimeDetailDatas?.map((showTimeData) => 
                                            <button
                                                style={{
                                                    padding: '1px',
                                                    border: '5px solid #dc5c5c',
                                                    backgroundColor: 'white',
                                                    borderRadius: '2px',
                                                    marginRight: '20px',
                                                    width: 'fit-content'
                                                }}
                                                onClick={() => {
                                                    if(dataCookies?.isLogin)
                                                    {
                                                        router.push({
                                                            pathname: RouterPath.TICKET_PAGE,
                                                            params: {
                                                                ids: AES.encrypt(showTimeData?.id?.toString(), 'ids').toString(),
                                                                page: 1
                                                            }
                                                        })
                                                    } else {
                                                        Utils.showErrorToast({
                                                            message: "Vui lòng đăng nhập để thực hiện chức năng này",
                                                        });
                                                        router.push({
                                                            pathname: RouterPath.LOGIN,
                                                        })
                                                    }
                                                }}
                                            >
                                                {itemShowTime(showTimeData)}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>    
                ))}
                </div>
            </div>
        </div>
        
    )
}

export default DetailFilm

