import React from "react";
import styles from './ListChair.module.scss'
import { IconSoldChair, IconSelectedChair, IconRegularChair, IconVipChair, IconDoubleChair } from "../../assets/icons/list-Icon";
import { IconButton } from "@material-ui/core";
function ListChair(props)
{
    var {
        countRowChartVip,
        listChairChose, // Danh sach ghe duoc chon
        setListChairChose,
        detailShow
    } = props
    const countRow = detailShow?.roomDetail?.totalRow
    const countCol = detailShow?.roomDetail?.totalColumn
    countRowChartVip = 9;
    const countRowArr = Array.from({ length: countRow }, (_, i) => String.fromCharCode('A'.charCodeAt() + i));
    const countColArr = Array.from({ length: countCol }, (_, i) => i);
    const listChairSold = detailShow?.listTicketData?.filter(ticket => ticket.type == '20' || ticket.type == '30').map(ticket => ticket.name);
    const listChairVip = detailShow?.listTicketData?.filter(ticket => ticket.typeSeat == 20).map(ticket => ticket.name);
    const handleChose = (e, index) => {
        if(listChairSold.includes(index) == false && listChairChose.filter(x => x.name == index).length == 0)
        {
            const chairChose = detailShow?.listTicketData?.filter(x => x.name == index)
            setListChairChose([...listChairChose, ...chairChose])
        }
        else if(listChairChose.filter(x => x.name == index).length != 0) {
            setListChairChose(listChairChose.filter(item => item?.name != index))
        }
    }
    return(
        <div className={styles.ListChair}>
            {countRowArr.map((item, index) => (
                <div className={styles.Chair}>
                    {countColArr.map((ind) => (
                            <div style={{ padding: 0, cursor: 'pointer' }} id={`${item}${ind}`}  onClick={e => handleChose(e, `${item}${ind}`)}>{
                                (listChairChose?.filter(x => x.name == `${item}${ind}`).length != 0) ? 
                                    <IconSelectedChair text={`${item}${ind}`}/> :
                                        listChairSold.includes(`${item}${ind}`) ? 
                                            <IconSoldChair text={`${item}${ind}`}/> :  
                                                listChairVip.includes(`${item}${ind}`) ?  <IconVipChair text={`${item}${ind}`}/> :
                                                    // index == countRowChartVip + 1 ?  <IconDoubleChair text={`${item}${Math.round(ind/2)}`}/> : 
                                                        <IconRegularChair text={`${item}${ind}`}/>
                            }</div>
                        )
                    )}
                </div>
            ))}
        </div>    
    )
}
export default ListChair;