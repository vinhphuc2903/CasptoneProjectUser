/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unreachable */
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ToastifyCommom from "../../shared/components/toastify/ToastifyCommon"
import SlideShow from "./common/SlideShow";
import { brand1, brand2, brand3, brand4, sale1, sale2, sale3, TaChuCam,
    ThuyQuai,
    PhimHot,
    PhimHe } from "../../assets/images"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { liveChat } from "../../assets/images";
import { mesageSent } from "../../assets/images";
import { TextField } from "@mui/material";
import IconAddProduct from "../../assets/icons/icon-addproduct";
import AddressAction from "../../redux/address/action";
import { useDispatch } from "react-redux";
import useRouter from "../../hooks/use-router";
import ProductAction from "../../redux/product/action";
import * as RouterPath from "../../router/RouterPath";
import { MovieSelection } from "../../assets/images";
import {
    Box,
    Grid,
    Container,
} from "@material-ui/core";
import convertStringToNumber from "lib-pbl6"
import LoginAction from "../../redux/login/action";

function HomePage() {
    const router = useRouter();
    const [isShowChat, setShowChat] = React.useState(false);
    const [valueInput, setValueInput] = React.useState("");
    const dispatch = useDispatch()

    const [bestSeller, setBestSeller] = useState([]);
    const getProduct = async () => {

        dispatch({
            type: ProductAction.GET_BEST_SELLER,

            onSuccess: (data) => {
                setBestSeller(data?.data?.result)
            },
        })
    }
    useEffect(() => {
        // getProduct()
        dispatch({
            type: LoginAction.GET_USER_DETAIL,
          })
    }, [])

    const handleSenchat = () => {
        if (valueInput === "") return;
        getMessage(valueInput)
    }
    const getMessage = (data) => {
        const idMax = dataChat[dataChat.length - 1].id + 1
        dispatch({
            type: AddressAction.GET_MESSAGE,
            data: {
                question: data
            },
            onSuccess: (datas) => {
                setdataChat([
                    ...dataChat,
                    {
                        id: idMax,
                        content: valueInput,
                        user: 'user',
                    },
                    {
                        id: idMax + 1,
                        content: datas,
                        user: 'admin'
                    },
                ]
                )
            },
            onError: (data) => {
                setdataChat([
                    ...dataChat,
                    {
                        id: idMax,
                        content: valueInput,
                        user: 'user',
                    },
                    {
                        id: idMax + 1,
                        content: ": Có lỗi xảy ra, vui lòng báo với Admin theo số: 0377777888",
                        user: 'admin'
                    },
                ])
            }
        })
        setValueInput('')

    }
    const [dataChat, setdataChat] = React.useState([
        {
            id: 1,
            content: ': Chào bạn đến cửa hàng SC SHOP, Vui lòng gửi câu hỏi để nhân viên chúng tôi được tư vấn trực tiếp cho bạn?',
            user: 'admin'
        }
    ]);
    const setTopRender = () => {
        const idMax = dataChat[dataChat.length - 1].id
        const dataScroll = document.getElementById(`data${idMax}`);
        if (dataScroll !== null) {
            dataScroll.scrollIntoView({ block: 'start' })
        }
    }
    const list = [
        {
            name: 'test'
        },
        {
            name: 'ok'
        }
    ]
    console.log(list.map((item) => ({
        data: item?.name
    })))
    useEffect(() => {
        setTopRender()
    }, [dataChat])
    return (
        <div className={styles.homepage}>
            <ToastifyCommom />
            <div className={styles.homepagemain}>
                <Header />
                <div className={styles.slide}>
                    <SlideShow />
                </div>
                <div className={styles.movie}>
                    <img width='100%' src={MovieSelection} />
                </div>
                <div className={styles.brand}>
                    <img src={TaChuCam}
                        className={styles.brandItem} />
                    <img src={ThuyQuai}
                        className={styles.brandItem} />
                    <img src={PhimHe}
                        className={styles.brandItem} />
                    <img src={PhimHot}
                        className={styles.brandItem} />
                </div>
                {/* <div className={styles.sale}>
                    <img src={sale1}
                        className={styles.saleItem} />
                    <img src={sale2}
                        className={styles.saleItem} />
                    <img src={sale3}
                        className={styles.saleItem} />
                </div> */}

                <div className={styles.product}>
            
                {/* <div className={styles.title}><h1>FILM BESTSELLER</h1></div> */}
                    {/* <div className={styles.productCard}>
                        <Container>
                            <Grid container spacing={3} >
                                {bestSeller[0]?.map(item => {
                                    return (
                                        <Grid item sm={3}
                                            onClick={() => {
                                                let params = { ...router.getAll() };
                                                router.push({
                                                    pathname: RouterPath.DETAIL_LAPTOP,
                                                    params: {
                                                        ...params,
                                                        prd: item.id,
                                                    }
                                                })
                                            }} >
                                            <Card key={item.id} sx={{}}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="200"
                                                        img src={item?.avtImageUrl}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="body2" component="div" style ={{height: '80px'}}>
                                                            {item?.name}
                                                        </Typography>
                                                        <Typography variant="h5" color="text.secondary">
                                                            {convertStringToNumber(item?.price?.toString(), true)}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Container>
                    </div> */}
                    {/* <div className={styles.title}><h1>FOOD BESTSELLER</h1></div> */}
                    {/* <div className={styles.productCard}>
                        <Container>
                            <Grid container spacing={3} >
                                {bestSeller[1]?.map(item => {
                                    return (
                                        <Grid item sm={3}
                                            onClick={() => {
                                                let params = { ...router.getAll() };
                                                router.push({
                                                    pathname: RouterPath.DETAIL_LAPTOP,
                                                    params: {
                                                        ...params,
                                                        prd: item.id,
                                                    }
                                                })
                                            }} >
                                            <Card key={item.id} sx={{}}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="200"
                                                        img src={item?.avtImageUrl}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="body2" component="div">
                                                            {item?.name}
                                                        </Typography>
                                                        <Typography variant="h5" color="text.secondary">
                                                            {convertStringToNumber(item?.price?.toString(), true)}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Container>
                    </div> */}
                    {/* <div className={styles.title}><h1>GAMMING GEAR BESTSELLER</h1></div> */}
                    {/* <div className={styles.productCard}>
                        <Container>
                            <Grid container spacing={3} >
                                {bestSeller[3]?.map(item => {
                                    return (
                                        <Grid item sm={3}
                                            onClick={() => {
                                                let params = { ...router.getAll() };
                                                router.push({
                                                    pathname: RouterPath.DETAIL_LAPTOP,
                                                    params: {
                                                        ...params,
                                                        prd: item.id,
                                                    }
                                                })
                                            }} >
                                            <Card key={item.id} sx={{}}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="200"
                                                        img src={item?.avtImageUrl}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="body2" component="div">
                                                            {item?.name}
                                                        </Typography>
                                                        <Typography variant="h5" color="text.secondary">
                                                            {convertStringToNumber(item?.price?.toString(), true)}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Container>
                    </div> */}
                </div>
                {/* <div>
                    {isShowChat && (
                        <div
                            style={{
                                minWidth: '440px',
                                maxWidth: '440px',
                                minHeight: '540px',
                                position: 'fixed',
                                bottom: '100px',
                                right: '40px',
                                borderRadius: '5px',
                                background: '#efeee9d6',
                                border: '1px solid #526d88',
                                zIndex: 1000,
                                display: 'flex',
                                flexDirection: 'column',
                                block: 'end',
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: '10px',
                                    color: 'red',
                                    border: '1px solid #526d88',
                                    borderRadius: '5px',
                                    width: '100%',
                                    height: '40px',
                                    backgroundColor: '#e3e3e3'
                                }}
                            >
                                Chat(Admin)
                            </div>
                            <div
                                style={{
                                    position: 'relative',
                                    zIndex: '-1',
                                    maxHeight: '435px',
                                    overflow: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                {dataChat?.map((item) => {
                                    return (
                                        item?.user === 'admin' ?
                                            (<div
                                                id={`data${item?.id}`}
                                                style={{
                                                    fontSize: '13px',
                                                    maxWidth: '300px',
                                                    border: '1px solid #526d88',
                                                    borderRadius: '20px',
                                                    backgroundColor: '#91d0f7',
                                                    marginTop: '10px',
                                                    // minHeight: '20px',
                                                    padding: '4px',
                                                    width: 'fit-content',
                                                    paddingLeft: '10px',
                                                    paddingRight: '10px',
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                Admin{item?.content}
                                            </div>) :
                                            <div
                                                style={{
                                                    marginLeft: '150p',
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                }}
                                                id={`data${item?.id}`}
                                            >
                                                <div
                                                    style={{
                                                        width: 'fit-content',
                                                        maxWidth: '300px',
                                                        fontSize: '13px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-end',
                                                        border: '1px solid #526d88',
                                                        borderRadius: '20px',
                                                        minHeight: '20px',
                                                        padding: '4px',
                                                        backgroundColor: '#ffe78b',
                                                        marginTop: '10px',
                                                        paddingLeft: '10px',
                                                        paddingRight: '10px',
                                                        marginRight: '10px',
                                                        // height: 'inherit'
                                                    }}
                                                >
                                                    {item?.content}
                                                </div>
                                            </div>
                                    )
                                }
                                )}
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    height: '58px',
                                    background: 'white',
                                    border: '1px solid #526d88',
                                    position: 'absolute',
                                    zIndex: '10',
                                    bottom: '0px',
                                }}
                            >
                                <TextField
                                    label='Tư vấn tại đây '
                                    value={valueInput}
                                    onChange={(e) => {
                                        setValueInput(e?.target?.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e?.keyCode === 13) {
                                            handleSenchat()
                                        }
                                    }}
                                    variant="outlined"
                                    sx={{
                                        width: '440px',
                                        height: '40px',
                                        border: '0px',
                                        padding: '0px'
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={(e) => handleSenchat()}
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
                                    InputLabelProps={{ style: { fontSize: 13, width: '400px', height: '40px', padding: 0 } }}
                                />
                            </div>
                        </div>
                    )}

                    <IconButton
                        onClick={(e) => setShowChat(!isShowChat)}
                    >
                        <img src={liveChat}
                            style={{
                                width: '70px',
                                height: '70px',
                                position: 'fixed',
                                bottom: '20px',
                                right: '40px',
                                borderRadius: '50%',
                                border: '1px solid #526d88'
                            }}
                        />
                    </IconButton>

                </div> */}
                <Footer />
            </div>
        </div>
    )
}
export default HomePage;