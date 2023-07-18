import React from "react";
import styles from './Footer.module.scss'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {social} from '../../assets/images'

function Footer() {
    return (
        <div className={styles.footer} >
            <div className={styles.info}>
                <div className={styles.contact}>
                    <div><LocationOnOutlinedIcon /> 54 Nguyễn Lương Bằng</div>
                    <div><LocalPhoneOutlinedIcon/> 090567890</div>
                    <div><MailOutlineIcon/>  pbl6@mail.com</div>
                </div>
                <div className={styles.social}>
                    <img src ={social} className ={styles.imgSocial}/>
                </div>
            </div>
        </div>
    )
}
export default Footer;