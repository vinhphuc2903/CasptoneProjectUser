import React, { useEffect } from "react";
import useRouter from "../../hooks/use-router";
import * as RouterPath from "../../../src/router//RouterPath"
import { useDispatch } from 'react-redux';
import OrderAction from "../order/action";
import Utils from "../../utils/Utils";
import getErrorMessage from "../../utils/ErrorConstant";

function PageNull()
{
    const router = useRouter();
    const dispatch = useDispatch()

    useEffect(() => {
        let params = { ...router.getAll() };
        if(params?.vnp_ResponseCode == null || typeof params?.vnp_ResponseCode == 'undefined')
        {
            console.log(params)
            params.vnp_ResponseCode = "01"
        }
        dispatch({
            type: OrderAction.UPDATE_STATUS_PAYMENT,
            data: params,
            onSuccess: (data) => {
                Utils.showSuccessToast({
                    message: "Thanh toán thành công",
                });
                router.push({
                    pathname: RouterPath.BOOKING_PAGE,
                })
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message: "Thanh toán thất bại: vui lòng tạo đơn hàng mới"
                    //   `Thanh toán thất bại: ${getErrorMessage(data)}`,
                  });
                router.push({
                    pathname: RouterPath.BOOKING_PAGE,
                })
            },
        })
        // if()
        // {
        //     router.push({
        //         pathname: RouterPath.DETAIL_ORDER,
        //         params: {
        //             id: params?.vnp_TxnRef,
        //             stt: "Dtt"
        //         }
        //     })
        // }
    }, [])
    return <div>Vui lòng chờ thanh toán....</div>
}

export default PageNull