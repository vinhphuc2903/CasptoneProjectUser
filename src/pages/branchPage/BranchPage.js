/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './BranchPage.module.scss'
import Header from "../../components/Header/Header";
import { useDispatch } from "react-redux";
import AddressAction from "../../redux/address/action";
import useRouter from "../../hooks/use-router";
import * as RouterPath from "../../router/RouterPath"
import { AES } from "crypto-js";

function BranchPage(props) 
{
    const [listBranch, setListBranch] = useState([])
    
    const dispatch = useDispatch()
    const router = useRouter()
    const getBranch = (dataSubmit) => {
        dispatch({
            type: AddressAction.GET_BRANCH,
            params: dataSubmit,
            onSuccess: (data) => {
                setListBranch(data)
            },
        })
    }
    useEffect(() => {
        getBranch()
    }, [])
    const currentDate = new Date();
    return (
        <div className={styles.Showtime}>
            <div className={styles.contentMain}>
                <Header />
                <div className={styles.headerContent}>
                    {listBranch?.map((item) => {
                        return (
                            <div 
                                className={styles.itemContent}
                                style={{ display: 'flex', justifyContent: 'center',flexBasis: '49%' }}
                                onClick={(e) => {
                                    router.push({
                                        pathname: RouterPath.SHOWTIMES,
                                        params: {
                                            branchids: AES.encrypt(item.id?.toString(), 'branchids').toString(),
                                            date: currentDate
                                        }
                                    })
                                }}
                            >    
                                <div className={styles.imageContainer}>
                                    <img src={item?.brackgroundImageLink} className={styles.zoomEffect}  width = '100%'/>
                                </div>
                                <div className={styles.headerNameContent}>{item?.name}</div>
                                <div className={styles.hotLine}>{item?.address}</div>
                                <div className={styles.hotLine}>Hotline: {item?.phone}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        
    )
}

export default BranchPage