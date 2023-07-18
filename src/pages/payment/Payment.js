import React from "react";
import styles from './Payment.module.scss'
import Header from "../../components/Header/Header";
import ToastifyCommom from "../../shared/components/toastify/ToastifyCommon"
import { IconRight, IconFirstStep, IconSecondStep, IconThirdStep, IconLocation, IconTrash, IconEdit, IconDollar } from "../../assets/icons/list-Icon";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import CartTable from "../../components/Cart/CartTable/CartTable";
import { useDispatch } from 'react-redux';
import OrderAction from "../../redux/order/action";
import AddressAction from "../../redux/address/action";
import useRouter from "../../hooks/use-router";
import { Controller, useForm } from 'react-hook-form'
import Autocomplete from "@mui/material/Autocomplete";
import { TextLabel } from "@findxdn/erp-theme";
import { ToastContainer, toast } from 'react-toastify';
import Utils from "../../utils/Utils";
import * as RouterPath from '../../router/RouterPath'
import convertStringToNumber from "lib-pbl6";

const styleTextField = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "3px",
      height: "42px",
      padding: "0px",
      width: "100%",
      fontSize: 14,
      color: "#333333",
      zIndex: "1",
      backgroundColor: '#ffffff',
      "& .MuiOutlinedInput-input": {
        height: "16px",
        paddingLeft: "10px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: '1px solid #d8d7d7',
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: '1px solid #d8d7d7',
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: '1px solid #d8d7d7',
      },
    },
};

function Payment() {
    const [cart, setCart] = React.useState([]);
    const [isShowAddress, setIsShowAddress] = React.useState(false);
    const [province, setProvince] = React.useState([]);
    const [district, setDistrict] = React.useState([]);
    const [comunity, setCommunity] = React.useState([]);
    const [listAddress, setListAddress] = React.useState([]);
    const [addressDefault, setAddressDefait] = React.useState();

    const dispatch = useDispatch()
    const getOrderByid = async () => {
        dispatch({
            type: OrderAction.GET_ORDER_BY_ID,
            onSuccess: (data) => {
                setCart(data?.data?.result)
            },
        })
    }


    const addAddress = async (data) => {
        dispatch({
            type: AddressAction.ADD_ADDRESS,
            data: data,
            onSuccess: (data, index) => {
                getListAddress()
                Utils.showSuccessToast({
                    message: "Thêm địa chỉ thành công",
                })
                setIsShowAddress(!isShowAddress)
                reset();
            },
            onError: () => {
                Utils.showErrorToast({
                    message: "Có lỗi xãy ra, vui lòng kiểm tra lại",
                })
            }
        })
    }

    const getDistrict = async (id) => {
        dispatch({
            type: AddressAction.GET_DISTRICT,
            data: {
                idProvince: id,
            },
            onSuccess: (data) => {
                const dataPrv = data?.data?.result?.map((item) => {
                    return {
                        key: item?.id,
                        label: item?.name,
                    }})
                setDistrict(dataPrv)
            },
        })
    }

    const handleAddOrder =  async (data) => {
        dispatch({
            type: OrderAction.ADD_ORDER,
            data: cart?.list?.map((item) => {
                return {
                    productId: item?.productId,
                    quantity: item?.quantity,
                    note: '',
                }
            }),
            param: {
                idAddress: data?.adreesTo,
                payment: data?.delivery,
                time: data?.deliveryTime,
            },
            onSuccess: (data) => {
                Utils.showSuccessToast({
                    message: "Đặt hàng thành công",
                })
                if(data?.data?.result?.paymentURL !== null && data?.data?.result?.paymentURL !== '' && typeof data?.data?.result?.paymentURL !== 'undefined')
                {
                   
                    window.location.href = data?.data?.result?.paymentURL
                }
                else {
                    router.push({
                        pathname: RouterPath.PENDING,
                    })
                }
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message: "Có lỗi xảy ra, không thể đặt hàng",
                })
            }
        })
    }


    const getProvince = async () => {
        dispatch({
            type: AddressAction.GET_PROVINCE,
            onSuccess: (data) => {
                const dataPrv = data?.data?.result?.map((item) => {
                    return {
                        key: item?.id,
                        label: item?.name,
                    }})
                setProvince(dataPrv)
            },
        })
    }

    const getListAddress = async () => {
        dispatch({
            type: AddressAction.GET_LIST_ADDRESS_BY_USER,
            onSuccess: (data, index) => {
                const dataAddress = data?.data?.result?.map((item) => {
                    if(item?.isDefault)
                    {
                        setAddressDefait()
                    }
                    return {
                        label: 
                            item?.address + 
                            ( item?.address && ", " ) 
                            
                            + item?.communityName 
                            + ( item?.communityName && ", " ) 
                            
                            + item?.districtName 
                            +  ( item?.districtName && ", " ) 
                            
                            + item?.provinceName 

                            + (item?.phone && `${' (' + item?.phone  + ') ' }`)
                            + (item?.isDefault ? '  - ĐỊA CHỈ MẶT ĐỊNH' : '')
                            ,
                            
                        key: item?.id,
                    }})
                setListAddress(dataAddress)
            },
        })
    }

    const getCommunity = async (id) => {
        dispatch({
            type: AddressAction.GET_COMMUNITY,
            data: {
                idDistrict: id,
            },
            onSuccess: (data) => {
                const dataCmm = data?.data?.result?.map((item) => {
                    return {
                        key: item?.id,
                        label: item?.name,
                    }})
                setCommunity(dataCmm)
            },
        })
    }

    React.useEffect(() => {
        getOrderByid()
        getProvince()
        getListAddress()
    }, [])

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function createRow(desc, price) {
        return { desc, price };
    }

    function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        handleAddOrder(data)
    }
    const onSubmitV2 = () => {
        const Data = getValues()
        const data = {
            phone: Data?.numberPhone,
            provinceName: Data?.province,
            districtName: Data?.district,
            communityName: Data?.community,
            address: Data?.address,
            isDefault: false,
        }
        addAddress(data)
    }
    const row1 = [
        createRow('Tổng tiền hàng', cart?.total ?? 0),
        createRow('Phí vận chuyển', 30000),
        createRow('Giảm phí vận chuyển', cart?.total ?? 0 > 1000000 ? -30000 : 0),
    ];

    const invoiceSubtotal = subtotal(row1);
    const router = useRouter();
    return (
        <div className={styles.payment}>
            <Header />
            <ToastContainer />
            <div className={styles.tiltleReturn}>
                <div
                    onClick={e => {
                        window.location = '/'
                    }}
                    className={styles.header}
                >
                    Trang Chủ
                </div>
                <IconRight />
                Thanh toán
            </div>
            <ToastifyCommom />
            <div className={styles.steps}>
                <div 
                    style={{ display: 'flex' }}
                    className={styles.stepsItem}
                    onClick={(e) => {
                        router.push({
                            pathname: '/cart',
                        })
                    }}
                >
                    <div style={{ paddingTop: '8px' }}><IconFirstStep /></div>
                    <div>
                        <h6> Bước 1</h6>
                        <p >Giỏ hàng của bạn</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }} 
                    className={styles.stepsItem}
                >
                    <div style={{ paddingTop: '8px' }}>
                        <IconSecondStep />
                    </div>
                    <div style= {{ color: "rgb(209, 79, 79)"}}>
                        <h6> Bước 2</h6>
                        Thanh toán
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ paddingTop: '8px' }}> <IconThirdStep /></div>
                    <div>
                        <h6> Bước 3</h6>
                        Hoàn tất
                    </div>
                </div>
            </div>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className={styles.detailPayment}
            >
                <div className={styles.detail}>
                    <div className={styles.address}>
                        <div 
                            style={{
                                marginBottom: 20
                            }}
                        >
                            <div 
                                style={{ 
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    gap: '490px',
                                    width: '100%',
                                    borderBottom: '1px solid  rgba(163, 158, 158, 0.345' 
                                }}
                            >
                                <div style={{ display: 'flex', gap: '10px', fontWeight: '700' }}>
                                    <IconLocation />
                                    Địa chỉ nhận hàng
                                </div>

                                <div style={{ paddingBottom: '10px' }}>
                                    <Button 
                                        size='small' 
                                        variant="outlined" 
                                        startIcon={<AddCircleOutlineIcon />} 
                                        style={{ color: 'black', textTransform: 'none', border: '0.2px solid black' }}
                                        onClick={(e) => {
                                            setIsShowAddress(!isShowAddress)
                                            reset()
                                        }}
                                    >
                                       {isShowAddress ? "Hủy thêm" : "Thêm mới"}
                                    </Button>

                                </div>

                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '350px', paddingTop: '10px' }}>
                                <div
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <TextLabel>
                                        Chọn địa chỉ
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { ref, onChange, value, ...rest } }) => (
                                            <Autocomplete
                                                {...rest}
                                                options={listAddress}
                                                variant="outlined"
                                                getOptionLabel={(option) => {
                                                    return option.label
                                                }}
                                                filterOptions={(x) => x}
                                                sx={{ 
                                                    width: '100%'
                                                }}
                                                onChange={(e, item) => {
                                                    setValue('adreesTo', item?.key)
                                                    onChange(item?.key)
                                                }}
                                                renderInput={(params) => 
                                                    <TextField 
                                                        fullWidth
                                                        sx={styleTextField} 
                                                        variant="outlined"
                                                        {...params} 
                                                    />}
                                                />
                                            )}
                                        name="adreesTo"
                                    />
                                    {errors?.adreesTo?.type === "required" && (
                                    <p style={{ color: 'red' }}>Vui lòng chọn địa chỉ giao hàng! </p>)}
                                </div>
                            </div>
                        </div>
                        {isShowAddress &&
                        <form
                            className={styles.addressNew}
                        >
                            <div style={{ 
                                    display: 'flex',
                                    gap: '10px',
                                    fontWeight: '700',
                                    paddingLeft: '40px',
                                    paddingBottom: '10px',
                                    borderBottom: '1px solid  rgba(163, 158, 158, 0.345' 
                                }}
                            >
                                <IconLocation />
                                Địa chỉ mới
                            </div>
                            <div 
                                style={{ 
                                    display: 'flex', 
                                    gap: '50px', 
                                    width: '100%', 
                                    marginLeft: '50px',
                                    marginTop: '20px'
                                }}
                            >
                                <div>
                                    <TextLabel>
                                        Tỉnh, thành phố
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        render={({ field: { ref, onChange, ...rest } }) => (
                                            <Autocomplete
                                                {...rest}
                                                options={province}
                                                variant="outlined"
                                                noOptionsText="Không tìm thấy"
                                                getOptionLabel={(option) => option.label}
                                                sx={{ 
                                                    width: 200 ,
                                                }}
                                                onChange={(e, item) => {
                                                    onChange(item?.label)
                                                    getDistrict(item?.key)
                                                }}
                                                renderInput={(params) => 
                                                    <TextField 
                                                        fullWidth
                                                        sx={styleTextField} 
                                                        variant="outlined"
                                                        {...params} 
                                                    />}
                                                />
                                            )}
                                        name="province"
                                    />
                                </div>
                                <div>
                                    <TextLabel>
                                        Quận huyện 
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        render={({ field: { ref, onChange, ...rest } }) => (
                                            <Autocomplete
                                                {...rest}
                                                options={district}
                                                variant="outlined"
                                                getOptionLabel={(option) => option.label}
                                                sx={{ 
                                                    width: 200 ,
                                                }}
                                                onChange={(e, item) => {
                                                    onChange(item?.label)
                                                    getCommunity(item?.key)
                                                }}
                                                renderInput={(params) => 
                                                    <TextField 
                                                        fullWidth
                                                        sx={styleTextField} 
                                                        variant="outlined"
                                                        {...params} 
                                                    />}
                                                />
                                            )}
                                        name="district"
                                    />
                                </div>
                                <div>
                                    <TextLabel>
                                        Xã, thị trấn
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        render={({ field: { ref, onChange, ...rest } }) => (
                                            <Autocomplete
                                                {...rest}
                                                options={comunity}
                                                variant="outlined"
                                                getOptionLabel={(option) => option.label}
                                                sx={{ 
                                                    width: 200 ,
                                                }}
                                                onChange={(e, item) => {
                                                    onChange(item?.label)
                                                }}
                                                renderInput={(params) => 
                                                    <TextField 
                                                        fullWidth
                                                        sx={styleTextField} 
                                                        variant="outlined"
                                                        {...params} 
                                                    />}
                                                />
                                            )}
                                        name="community"
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    marginTop: '20px',
                                    marginLeft: '50px',
                                    marginRight: '50px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    gap: '50px'
                                }}
                            >
                                <div
                                    style={{
                                        width: '450px'
                                    }}
                                >
                                    <TextLabel>
                                        Địa chỉ cụ thể 
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        render={({ field: { ref, onChange, value, ...rest } }) => (
                                            <TextField 
                                                fullWidth
                                                sx={styleTextField} 
                                                onChange={onChange}
                                                value={value}
                                                variant="outlined"
                                                {...rest}
                                            />
                                            )}
                                        name="address"
                                    />
                                </div>
                                <div
                                    style={{
                                        // width: 'webkit-fill-available'
                                        width: '200px'
                                    }}
                                >
                                    <TextLabel>
                                        Số điện thoại
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        render={({ field: { ref, onChange, value, ...rest } }) => (
                                            <TextField 
                                                fullWidth
                                                sx={styleTextField} 
                                                type="text"
                                                onChange={onChange}
                                                value={value}
                                                variant="outlined"
                                                {...rest}
                                            />
                                            )}
                                        name="numberPhone"
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                            <Button 
                                style={{
                                    width: '300px',
                                    backgroundColor: '#F20707',
                                    color: '#FFFFFF',
                                    marginTop: '20px',
                                    height: '38px',
                                }}
                                // type="submit"
                                onClick={onSubmitV2}
                            >
                                Thêm địa chỉ
                            </Button>
                            </div>
                        </form>
                        }
                    </div>
                    
                    <div className={styles.infoProduct}>
                        <div
                            style={{
                                width: '900px',
                                marginTop: '30px',
                                paddingTop: '10px',
                                padsdingBottom: '10px',
                                borderRadius: '10px',
                                boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px',
                            }}
                        >
                            <CartTable 
                                data={cart} 
                                width={880} 
                                disabledBt
                                control={control} 
                                getValues={getValues}
                                setValue={setValue}
                                isPayment />
                        </div>
                    </div>
                    <div className={styles.note}>
                        <div style={{ width: '100%', borderBottom: '1px solid  rgba(163, 158, 158, 0.345', padding: '10px', paddingLeft: '25px', fontWeight: 700 }}>
                            <div>
                                <AccessTimeIcon />
                                Thời gian nhận hàng
                            </div>
                        </div>
                        <div style={{ padding: '10px 25px 0px 25px' }}>
                            <FormControl>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { ref, ...rest } }) => (
                                    <RadioGroup {...rest}>
                                        <FormControlLabel value='1' control={
                                            <Radio sx={{
                                                color: red[800],
                                                '&.Mui-checked': {
                                                    color: red[600],

                                                },
                                            }} />}
                                            label="Tất cả các ngày trong tuần" />
                                        <FormControlLabel value='2' control={
                                            <Radio sx={{
                                                color: red[800],
                                                '&.Mui-checked': {
                                                    color: red[600],
                                                },
                                            }} />}
                                            label="Chỉ giao giờ hành chính" />
                                    </RadioGroup>
                                    )}
                                    name="deliveryTime"
                                />
                                {errors?.deliveryTime?.type === "required" && (
                                    <p style={{ color: 'red' }}>Vui lòng thời gian nhận hàng! </p>)}
                            </FormControl>
                        </div>
                        <div style={{ padding: '0px 25px 25px 25px' }}>
                            <TextField
                                label='Ghi chú'
                                variant="outlined"
                                sx={{ width: '800px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }} />
                        </div>
                    </div>
                </div>
                <div className={styles.bill}>
                    <div className={styles.paymentMethods}>
                        <div style={{ fontWeight: '700', display: 'flex', gap: '10px' }}>
                            <IconDollar />
                            Phương thức thanh toán
                        </div>
                        <div>
                            <div style={{ padding: '10px 25px 0px 25px' }}>
                                <FormControl>
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { ref, ...rest } }) => (
                                                <RadioGroup {...rest}>
                                                    <FormControlLabel value='1' control={
                                                        <Radio sx={{
                                                            color: red[800],
                                                            '&.Mui-checked': {
                                                                color: red[600],

                                                            },
                                                        }} />}
                                                        label="Thanh toán qua thẻ" />
                                                    <FormControlLabel value='2' control={
                                                        <Radio sx={{
                                                            color: red[800],
                                                            '&.Mui-checked': {
                                                                color: red[600],
                                                            },
                                                        }} />}
                                                        label="Thanh toán khi nhận hàng (COD)" />
                                                    {/* <FormControlLabel value='3' control={
                                                        <Radio sx={{
                                                            color: red[800],
                                                            '&.Mui-checked': {
                                                                color: red[600],
                                                            },
                                                        }} />}
                                                        label="Thanh toán qua ZaloPay" /> */}
                                                </RadioGroup>
                                                )}
                                            name="delivery"
                                        />   
                                        {errors?.delivery?.type === "required" && (
                                        <p style={{ color: 'red' }}>Vui lòng chọn phương thức thanh toán! </p>)}
                                </FormControl>
                            </div>
                        </div>
                        <div>
                            <TableContainer component={Paper}>
                                <Table sx={{ width: '350px' }} aria-label="spanning table">
                                    <TableBody>
                                        {row1.map((row) => (
                                            <TableRow key={row.desc}>
                                                <TableCell>{row.desc}</TableCell>
                                                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                            </TableRow>
                                        ))}

                                        <TableRow >
                                            <TableCell sx={{ fontWeight: '700' }}>Tổng phí thanh toán</TableCell>
                                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div>
                            <Button 
                                style={{
                                width: '355px',
                                backgroundColor: '#F20707',
                                color: '#FFFFFF',
                                marginTop: '20px',
                                height: '58px',

                                }}
                                type="submit"
                            >
                                MUA HÀNG
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
}
export default Payment;