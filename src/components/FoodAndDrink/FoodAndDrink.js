import { Button } from "@mui/material";
import React from "react";
import { ImageCorn, ImageCornWater } from "../../assets/images";
import styles from './FoodAndDrink.module.scss'
import convertStringToNumber from "lib-pbl6"

function FoodAndDrink(props)
{
    const { item, handleDecreaseTotal, handleIncreaseTotal } = props
    const [ value, setValue ] = React.useState(0);
    const handleOnclickIncrease = () => {
        if(value <= 9) {
            setValue(value + 1);
            handleIncreaseTotal(item?.price,item?.nameOption1, item?.id, 1 )
        }    
    }
    const handleOnclickDecrease = () => {
        if(value > 0) {
            setValue(value - 1);
            handleDecreaseTotal(item?.price,item?.nameOption1, item?.id, 1 )
        }  
    }
    return (
        <div className={styles.pageFood}>
            <div className={styles.pageFoodAndDrink}>
                <img src={ImageCornWater} />
                <div className={styles.productName}>{item?.nameOption1}</div>
                <div className={styles.quantity}>{item?.nameOption2}</div>
                <div className={styles.price}>GIÁ: {convertStringToNumber((item?.price).toString())} VNĐ</div>
                <div className={styles.buttonCustom}>
                    <Button className={styles.buttonCs} onClick={handleOnclickDecrease}>-</Button>
                    <div className={styles.total}>{value}</div>
                    <Button className={styles.buttonCs} onClick={handleOnclickIncrease}>+</Button>
                </div>
            </div>    
        </div>    
    )
}

export default FoodAndDrink;