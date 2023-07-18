import React, { useState } from "react";
import styles from "../OrderAdmin/Order.module.scss"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Checkbox from '@mui/material/Checkbox';
import useRouter from "../../../hooks/use-router";
import OrderAction from "../../../redux/order/action";
import { useDispatch } from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Controller, useForm } from 'react-hook-form'
import { ToastContainer, toast } from "react-toastify";
import Utils from "../../../utils/Utils";
import moment from "moment";

function Order() {
    const router = useRouter();
    const [listOrder, setListOrder] = React.useState([]);
    let params = { ...router.getAll() };

    const dispatch = useDispatch()
    
    const getOrderByStatus = async (data) => {
        await dispatch({
            type: OrderAction.GET_LIST_ORDER_BY_STATUS,
            data: {
                status: data
            },
            onSuccess: (data) => {
                setListOrder(data?.data?.result?.result)
            },
            onError: (data) => {
                
            }
        })
    }

    const changeStatusOrder = async (param, data) => {
        await dispatch({
            type: OrderAction.CHANGE_STATUS_ORDER,
            data: data,
            params: param,
            onSuccess: (data) => {
                Utils.showSuccessToast({
                    message: data,
                })  
                getOrderByStatus(params?.tp) 
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message: data,
                }) 
            }
        })
    }
    const changeDeleteOrder = async (param, data) => {
        await dispatch({
            type: OrderAction.CHANGE_STATUS_ORDER,
            data: data,
            params: param,
            onSuccess: (data) => {
                Utils.showSuccessToast({
                    message: 'Hủy đơn hàng thành công',
                })         
                getOrderByStatus(params?.tp) 
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message: data,
                }) 
            }
        })
    }
    
    const {
        handleSubmit,
        control,
        getValues,
        reset,
        formState: { errors }
    } = useForm()
    
   
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    React.useEffect(() => {
        if( params?.tp !== null && params?.tp !== '' && typeof params?.tp !== 'undefined')
        {
            getOrderByStatus(params?.tp)
        }
        else {
            getOrderByStatus(1)
        }
    }, [params?.tp])

    const onSubmit = (data) => {
        console.log(data)
        var dataInput = []
        var dataInput1 = []
        var dataInput2 = []
        const param = {
            status:  parseInt(params?.tp) + 1,
            note: "",
        }
        
        const param1 = {
            status:  5,
            note: "",
        }
        const param2 = {
            status:  4,
            note: "",
        }
        let isChange = false;
        let isDelete = false;  
        let isUpdate = false;      
        for(let i = 0; i < listOrder?.length; i++)
        {
            if( data[i]?.status?.toString() === '2' )
            {
                dataInput = [ ...dataInput, data[i]?.idOrder]
                isChange = true;
            }
            if( data[`Update${i}`]?.status?.toString() === '3')
            {
                isUpdate = true;
                dataInput2 = [ ...dataInput2, data[`Update${i}`]?.idOrder]
            }
            if( data[`Delete${i}`]?.status?.toString() === '4')
            {
                isDelete = true;
                dataInput1 = [ ...dataInput1, data[`Delete${i}`]?.idOrder]
            }
        }
        isChange && changeStatusOrder(param, dataInput)
        isDelete && changeDeleteOrder(param1, dataInput1)
        isUpdate && changeStatusOrder(param2, dataInput2)
        reset()
    }
    return (
        <div class={styles.order}>
            <ToastContainer />
            <form class={styles.rightpage} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.idProduct}>
                    <div>
                        Tổng số đơn hàng: {listOrder?.length}
                    </div>
                    {/* <div>
                        <Button
                            style={{
                                width: '120px',
                                backgroundColor: '#333333',
                                color: '#FFFFFF',
                                height: '38px',

                            }}>
                            Tìm kiếm
                        </Button>
                    </div>
                    <div>
                        <Button
                            style={{
                                width: '120px',
                                backgroundColor: '#333333',
                                color: '#FFFFFF',
                                height: '38px',
                            }}>
                            Thiết lập lại
                        </Button>
                    </div> */}
                    { (params?.tp === '2' || params?.tp === '3') && listOrder?.length !== 0 &&
                    (
                        <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                            <Button
                                type="submit"
                                style={{
                                    width: '120px',
                                    backgroundColor: '#d81b1b',
                                    color: '#efefef',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    height: '38px',
                                }}>
                                Duyệt đơn
                            </Button>
                        </div>
                    )
                }
                </div>
                <FormGroup>
                {listOrder?.map((item, index) => {
                    let check = false;
                    return(
                    <div className={styles.userPending}>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <AccountCircleIcon fontSize="large"/>
                            <p style={{paddingTop: '5px'}}>{item?.firstName}</p>
                        </div>
                        <div>
                            <div
                                style={{
                                    width: '1400px',
                                    borderRadius: '10px',
                                    boxShadow: ' rgba(149, 157, 165, 0.41) 0px 8px 24px',
                                }}
                            >
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: '700', minWidth: '150px' }}>Tên người dùng</TableCell>
                                                <TableCell style={{ fontWeight: '700', minWidth: '150px' }} align="center">Ngày đặt hàng</TableCell>
                                                <TableCell style={{ fontWeight: '700', minWidth: '100px' }} align="right">Tổng tiền</TableCell>
                                                <TableCell style={{ fontWeight: '700', minWidth: '150px' }} align="center">Phương thức thanh toán</TableCell>
                                                <TableCell style={{ fontWeight: '700', minWidth: '140px' }} align="center">Trạng thái</TableCell>
                                                <TableCell style={{ fontWeight: '700', minWidth: '140px' }} align="center">Loại giao hàng</TableCell>
                                                {/* {params?.tp == '2' && <TableCell style={{ fontWeight: '700', minWidth: '140px' }} align="center">Ghi chú</TableCell>} */}
                                                {params?.tp == '2' && <TableCell style={{ fontWeight: '700' }} align="right">Duyệt đơn</TableCell>}
                                                {params?.tp == '2' && <TableCell style={{ fontWeight: '700' }} align="right">Hủy đơn</TableCell>}
                                                {params?.tp == '3' && <TableCell style={{ fontWeight: '700' }} align="right">Đã giao hàng</TableCell>}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow
                                                key={item?.userId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    align="left"
                                                    sx={{ maxWidth: '400px' }}
                                                >
                                                    {item?.firstName}
                                                </TableCell>
                                                <TableCell align="center">{moment(item?.createAt).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell align="right">{item?.total}</TableCell>
                                                <TableCell align="center">{item?.paymentMethod === '1' ? 'Thanh toán qua thẻ' : 'Thanh toán khi nhận hàng(COD)'}</TableCell>
                                                <TableCell align="center">{item?.deliveryTime === '1' || params?.tp == '4' ? 'Đã thanh toán' : 'Chưa thanh toán'}</TableCell>
                                                <TableCell align="center">{item?.deliveryTime === '1' ? 'Tất cả các ngày trong tuần' : 'Chỉ giao giờ hành chính'}</TableCell>
                                                {/* {params?.tp == '2' && <TableCell align="right">
                                                    <TextField
                                                        label='Ghi chú'
                                                        variant="outlined"
                                                        InputLabelProps={{ style: { fontSize: 13 } }}
                                                        sx={{
                                                            width: '200px',
                                                        }}
                                                    />
                                                </TableCell>} */}
                                                {params?.tp == '2' && <TableCell align="right">
                                                    <Controller
                                                        render={({field: { onChange, value, ...rest }}) => (
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox 
                                                                    {...label} 
                                                                    {...rest} 
                                                                    value={item?.id} 
                                                                    onChange={(e) => {
                                                                        const data = getValues(`Delete${index}`)
                                                                        if((data?.status === 1 && value.status === 1) || (data?.status !== 1 && value?.status !== 1) || (data?.status === 1 && value?.status !== 1))
                                                                        {
                                                                            if(check !== true)
                                                                            {
                                                                                onChange({
                                                                                    idOrder: item?.id, 
                                                                                    status: 2,
                                                                                })
                                                                            }
                                                                            else {
                                                                                onChange({
                                                                                    idOrder: item?.id, 
                                                                                    status: 1,
                                                                                })
                                                                            }
                                                                            check =!check
                                                                        }
                                                                    }}
                                                                    checked={check}
                                                                />
                                                            }
                                                            label="Duyệt"
                                                        />)}
                                                        defaultValue={{
                                                            idOrder: item?.id, 
                                                            status: 1,
                                                        }}
                                                        name={`${index}`}
                                                        control={control}
                                                    />
                                                </TableCell>}
                                                {params?.tp == '2' && <TableCell align="right">
                                                    <Controller
                                                        render={({field: { onChange, value, ...rest }}) => (
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox 
                                                                    {...label} 
                                                                    {...rest} 
                                                                    value={item?.id} 
                                                                    onChange={(e) => {
                                                                        const data = getValues(`${index}`)
                                                                        if((data?.status === 1 && value.status === 1) || (data?.status !== 1 && value?.status !== 1) || (data?.status === 1 && value?.status !== 1))
                                                                            {
                                                                            if(check !== true)
                                                                            {
                                                                                onChange({
                                                                                    idOrder: item?.id, 
                                                                                    status: 4,
                                                                                })
                                                                            }
                                                                            else {
                                                                                onChange({
                                                                                    idOrder: item?.id, 
                                                                                    status: 1,
                                                                                })
                                                                            }
                                                                            check =!check
                                                                        }
                                                                    }}
                                                                    checked={check}
                                                                />
                                                            }
                                                            label="Hủy"
                                                        />)}
                                                        defaultValue={{
                                                            idOrder: item?.id, 
                                                            status: 1,
                                                        }}
                                                        name={`Delete${index}`}
                                                        control={control}
                                                    />
                                                </TableCell>}
                                                {params?.tp == '3' && <TableCell align="right">
                                                    <Controller
                                                        defaultValue={{
                                                            idOrder: item?.id, 
                                                            status: 1,
                                                        }}
                                                        control={control}
                                                        name={`Update${index}`}
                                                        render={({field: { onChange, value, ...rest }}) => (
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox 
                                                                    {...label} 
                                                                    {...rest} 
                                                                    label="Đã giao"
                                                                    value={item?.id}
                                                                    onChange={(e) => {
                                                                        if(check !== true)
                                                                        {
                                                                            onChange({
                                                                                idOrder: item?.id, 
                                                                                status: 3,
                                                                            })
                                                                        }
                                                                        else {
                                                                            onChange({
                                                                                idOrder: item?.id, 
                                                                                status: 2,
                                                                            })
                                                                        }
                                                                        check =!check
                                                                    }}
                                                                    checked={check}
                                                                />
                                                            }
                                                        />)}
                                                    />
                                                </TableCell>}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                    )}
                )}
                </FormGroup>
            </form>
        </div>
    )
}
export default Order;