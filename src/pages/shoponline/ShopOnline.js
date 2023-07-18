/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect} from "react";
import styles from './ShopOnline.module.scss'
import SlideShow from "./common/SlideShow/SlideShow";
import { GifPageMain, AsusImg, ImageProfile, AsusImage, AsusRogImage, LenovoImage, AcerImage } from "../../assets/images";
import Header from "../../components/Header/Header";
import ToastifyCommom from "../../shared/components/toastify/ToastifyCommon"
import { useDispatch, useSelector } from 'react-redux';
import CategoryAction from "../../redux/category/action";
import Cookies from 'js-cookie';

function ShopOnline(props) 
{
    return (
        <div className={styles.shopOnlineMain}>
            <Header />
            <ToastifyCommom />
            <div className={styles.gifHeader}>
                <img src={GifPageMain} 
                    style={{
                        width: '55%',
                    }}
                />
            </div>
            <div className={styles.imgHeader}> 
                <img src={AsusImg}
                    className={styles.imgItem}
                />
                <img src={ImageProfile}
                    className={styles.imgProfile}
                />
            </div>
            <div className={styles.imgMain}>
                <div className={styles.imgTop}>
                    <img src={AsusImage}
                        className={styles.imgItem}
                    />
                    <img src={AsusRogImage}
                        className={styles.imgItem}
                    />
                </div>
                <div className={styles.imgTop}>
                    <img src={LenovoImage}
                        className={styles.imgItem}
                    />
                    <img src={AcerImage}
                        className={styles.imgItem}
                    />
                </div>
            </div>
            <SlideShow />
        </div>
        
    )
}

export default ShopOnline