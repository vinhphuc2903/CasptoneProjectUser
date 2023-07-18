import React from "react";
import { IconOrder, IconCartOrder, IconSuccess } from "../../../assets/icons/list-Icon";
import styles from "./CartOrder.module.scss"

function CartOrder()
{
    return (
        <div className={styles.headerMain}>
            <div className={styles.iconLeft}>
                <IconOrder />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style= {{ color: "rgb(209, 79, 79)"}} >
                        Bước 1
                    </div>
                    <div style= {{ color: "rgb(209, 79, 79)"}}>
                        Giỏ hàng của bạn
                    </div>
                </div>
            </div>
            <div className={styles.iconCenter}>
                <IconCartOrder />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        Bước 2
                    </div>
                    <div>
                        Thanh toán
                    </div>
                </div>
            </div>
            <div className={styles.iconRight}>
                <IconSuccess />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        Bước 3
                    </div>
                    <div>
                        Hoàn tất
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default CartOrder
