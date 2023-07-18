import React, { useEffect, useState } from "react";
import CornWaterPage from "../cornWaterPage/CornWaterPage";
import TicketPage from "../ticketPage/TicketPage";
import ConfirmPage from "../confirmPage/ConfirmPage";
import useRouter from "../../hooks/use-router";
import OrderAction from "../../redux/order/action";
import { useSelector, useDispatch } from "react-redux";
import Utils from "../../utils/Utils";
import getErrorMessage from "../../utils/ErrorConstant";
import * as RouterPath from "../../router/RouterPath";

function OrderPage()
{
    const [Page, setPage] = useState()
    const router = useRouter();
    const [ listChairChose, setListChairChose] = useState([])
    const [ listOption, setListOption ] = React.useState([])
    const [ total, setTotal ] = React.useState(0)
    const showtime = useSelector((state) => state?.Order?.showtime);
    const dispatch = useDispatch();

    useEffect(() => {
        if(router.get('page') !== null)
        {
            setPage(router.get('page'))
        } else setPage(1)
    }, [router.get('page')])

    const handleCreateOrder  = () => {
        const data = {
            listTicketId: listChairChose?.map(item => item?.id),
            listFoodDetail: listOption?.map(item => ({
                foodId: item?.Id,
                quantity: item?.Quantity
            })),
            showTimeId: showtime?.id
        }
        dispatch({
            type: OrderAction.ADD_ORDER,
            data: data,
            onSuccess: (data) => {
                Utils.showSuccessToast({
                    message: "Tạo giao dịch thành công, vui lòng thanh toán trong vòng 5 phút!",
                });
                router.push({
                    pathname: RouterPath.BOOKING_PAGE,
                })
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message:
                      `Tạo giao dịch thất bại: ${getErrorMessage(data)}`,
                  });
            }
        })
    }
    const handlePaymentOrder  = () => {
        const data = {
            listTicketId: listChairChose?.map(item => item?.id),
            listFoodDetail: listOption?.map(item => ({
                foodId: item?.Id,
                quantity: item?.Quantity
            })),
            showTimeId: showtime?.id
        }
        dispatch({
            type: OrderAction.ADD_ORDER,
            data: data,
            onSuccess: (data) => {

                Utils.showSuccessToast({
                    message: "Tạo giao dịch thành công, thanh toán để tiếp tục!",
                });
                console.log('data', data)
                dispatch({
                    type: OrderAction.GET_LINK_PAYMENT,
                    params: { OrderId:  data?.data?.data?.OrderId},
                    onSuccess: (data) => {
                      window.location = data
                    },
                    onError: (data) => {
                      Utils.showErrorToast({
                        message:
                          `Thanh toán thất bại: ${getErrorMessage(data)}`,
                      });
                    }
                  })
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message:
                      `Tạo giao dịch thất bại: ${getErrorMessage(data)}`,
                  });
            }
        })
    }
    
    return(
        <div>
            {Page == 1 && <TicketPage listChairChose={listChairChose} setListChairChose={setListChairChose}/>}
            {Page == 2 && <CornWaterPage listOption={listOption} setListOption={setListOption} total={total} setTotal={setTotal} />}
            {Page == 3 && <ConfirmPage listChairChose={listChairChose} listOption={listOption} total={total} handleCreateOrder={handleCreateOrder} handlePaymentOrder={handlePaymentOrder}/>}
        </div>    
    )
}

export default OrderPage