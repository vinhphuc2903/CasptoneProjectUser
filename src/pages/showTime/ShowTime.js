/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './ShowTime.module.scss'
import Header from "../../components/Header/Header";
import useRouter from "../../hooks/use-router";
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as RouterPath from "../../router/RouterPath"
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import FilmAction from "../../redux/film/action";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Cookies from "js-cookie";
import Utils from "../../utils/Utils";
import AddressAction from "../../redux/address/action";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const itemShowTime = (showTime) => {
    return (
        <div
            style={{
                backgroundColor: '#dc5c5c',
                color: '#efe9e9',
                padding: '4px 6px',
                width: 'fit-content',
                borer: '1px solid white'
            }}
        >
            {showTime}
        </div>    
    )
}
const itemContent = (content) => {
    return (
        <div
            style={{
                backgroundColor: '#dc5c5c',
                color: '#efe9e9',
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
    const { filmInfo, dataCookies } = props
    const itemFilm = filmInfo?.filmInfo
    const showTimeDetailByDates = filmInfo?.showTimeDetailByDates
    const router = useRouter()
    const handleShowDetailFilm = () => {
        router.push({
            pathname: RouterPath.DETAIL_FILM,
            params: {
                idx: AES.encrypt(itemFilm?.id?.toString(), 'idx').toString()
            }
        })
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                minWidth: '100%',
                fontWeight: '600',
                fontSize: '14px',
                color: '#e9ecef',
            }}
        >
            <div 
                style={{minWidth: '300px', minHeight: '440px', border: '3px solid #efe9e9', cursor: 'pointer' }}
                onClick={(e) => {
                    handleShowDetailFilm()
                }}
            >
                <img src={itemFilm?.backgroundImage} width = '294px' />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: "column",
                    minWidth: '70%',
                    margin: '20px',
                    gap: '10px'
                }}
            >
                <div 
                    onClick={(e) => {
                        handleShowDetailFilm()
                    }}
                    style={{ 
                        fontSize: '30px', 
                        // textDecoration: 'line-through',
                        width: 'fit-content',
                        borderBottom: '3px solid #dc5c5c',
                        cursor: 'pointer'
                    }}
                >
                    {itemFilm?.name} (C{itemFilm?.ageLimit})
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px'
                    }}
                >
                    {itemContent(`2D`)}
                    {itemContent(`C${itemFilm?.ageLimit}`)}
                </div>
                <div>
                    {itemFilm?.listTypeFilm?.map((item, index) => {
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
                                color: '#efe9e9',
                                fontWeight: '500',
                                paddingRight: '5px'
                            }}
                        >
                            Đạo Diễn:
                        </div>
                        <div>
                            {itemFilm?.director}
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
                                color: '#efe9e9',
                                fontWeight: '500',
                                paddingRight: '5px'
                            }}
                        >
                            Diễn Viên: 
                        </div>
                        <div>
                            {itemFilm?.actor}
                        </div>
                    </div>
                </div>
                <div>
                    {itemFilm?.introduce}
                </div>
                <div
                    style={{
                        borderTop: '1px dotted #a29595',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20px',
                        paddingTop: '20px'
                    }}
                >
                    {showTimeDetailByDates?.map((ticket) => (
                        <button
                            style={{
                                padding: '1px',
                                border: '5px solid #dc5c5c',
                                backgroundColor: 'white',
                                borderRadius: '2px',
                                width: 'fit-content'
                            }}
                            onClick={() => {
                                if(dataCookies?.isLogin)
                                {
                                    router.push({
                                        pathname: RouterPath.TICKET_PAGE,
                                        params: {
                                            ids: AES.encrypt(ticket?.id?.toString(), 'ids').toString(),
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
                            {itemShowTime(`${formatNumber(ticket?.fromHour)} : ${formatNumber(ticket?.fromMinus)}`)}
                        </button>  
                    ))}
                </div>
            </div>
        </div>    
    )
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3, padding: 0, margin: '25px 0px 25px 0px', paddingBottom: '50px' }}>
            <Typography sx={{ display: 'flex', flexDirection: 'column', gap:'50px'}}>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
const LabelCustom = (item) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    color:'#efe9e9',
                    fontFamily: 'emoji',
                    fontWeight: 500,
                    fontSize: '16px'
                }}
            >
                {item?.day}
            </div>
            <div
                style={{
                    fontFamily: 'emoji',
                    fontWeight: 500,
                    fontSize: '16px',
                    color:'#efe9e9',
                }}
            >
                {item?.dateMonth}
            </div>
        </div>    
    )
}
function ShowTime(props) 
{
    const [value, setValue] = React.useState(0);
    const [branchIdData, setBranchId] = useState()
    const handleChange = (event, newValue) => {
        // setValue(newValue);
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + newValue);
        router.push({
            pathname: RouterPath.SHOWTIMES,
            params: {
                branchids: AES.encrypt(branchIdData?.toString(), 'branchids').toString(),
                date: moment(currentDate).format(("yyyy/MM/DD")),
                page: newValue
            }
        })

    };
    const [listFilm, setListFilm] = useState([]) 
    const router = useRouter()
    const dispatch = useDispatch()
    let params = { ...router.getAll() };
    const [branch, setBranch] = useState()
    const getBranch = (dataSubmit) => {
        dispatch({
            type: AddressAction.GET_BRANCH,
            params: { id: dataSubmit},
            onSuccess: (data) => {
                setBranch(data[0])
            },
        })
    }

    const getDetailShowTime = (params) => {
        dispatch({
            type: FilmAction.GET_SHOWTIME_BY_BRANCH,
            params: params,
            onSuccess: (data) => {
                setListFilm(data?.showTimeByDates)
                // setListProduct(data?.data?.result)
            },
        })
    }

    useEffect(() => {
        //giải mã
        const branchId = AES.decrypt(params?.branchids, 'branchids').toString(CryptoJS.enc.Utf8);
        const date = params?.date
        const dataSearch = {
            BranchId: branchId,
            DateRecord: moment(date).format("yyyy/MM/DD")
        }
        setBranchId(branchId)
        getBranch(branchId)
        getDetailShowTime(dataSearch)
        // setValue(params?.page)
        if(typeof params?.page != undefined && params?.page != null)
        {
            setValue(parseInt(params?.page))
        } else {
            setValue(0)
        }
    }, [params?.date])
    // useEffect(() => {
    //     let params = { ...router.getAll() };
    //     getProduct(params?.prd)
    //     getComment(params?.prd)
    // }, [])

    var daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

    // Lấy ngày hiện tại
    var now = new Date();

    // Tạo mảng chứa 7 ngày bắt đầu từ ngày hiện tại
    var days = [];
    for (var i = 0; i < 7; i++) {
        var date = new Date(now);
        date.setDate(now.getDate() + i);
        days.push({
            day: daysOfWeek[date.getDay()],
            dateMonth: date.getDate() + '/' + (date.getMonth() + 1)
        });
    }
    const [dataCookies, setDataCookies] = useState(Cookies.get());
    const token = Cookies.get('token')
    useEffect(() => {
        setDataCookies(Cookies.get());
      }, [token]); 
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.Showtime}>
            <ToastContainer />
            <div className={styles.contentMain}>
                <Header />
                <div className={styles.headerContent}>
                    <div
                        className={styles.headerMain}
                    >
                        <div className={styles.contentHeader}>
                            {branch?.name}
                        </div>
                        <div className={styles.hotLine}>
                            HOTLINE: {branch?.phone}
                        </div>
                        <div className={styles.contentHeaderUnder}>
                            TRUNG TÂM GIẢI TRÍ VÀ XEM PHIM MOMOCHI {branch?.address}
                        </div>
                    </div>
                    <div>
                        <Box sx={{ borderBottom: 1, borderColor: '#efe9e9' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                {days.map((item, index) => (
                                    <Tab label={LabelCustom(item)} {...a11yProps(index)} />
                                ))}
                            </Tabs>
                        </Box>
                        {days.map((item, index) => 
                            (<TabPanel value={value} index={index} sx={{ padding: 0 }}>
                                {listFilm?.map((itemFilm, index) => <FilmItem key={index} dataCookies={dataCookies} filmInfo={itemFilm} />)}
                            </TabPanel>))}
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ShowTime