import React from "react";
import styles from "../../../pages/admin/MyProduct/Admin.module.scss"
import { TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import CategoryAction from "../../../redux/category/action";
import Autocomplete from "@mui/material/Autocomplete";
import useRouter from "../../../hooks/use-router";
import ProductAction from "../../../redux/product/action";
import { Image } from "@findxdn/erp-theme"
import { IconButton } from "@mui/material";
import Utils from "../../../utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
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

function Product(props) {
    const { setValue } = props
    const dispatch = useDispatch()
    const [listHeaderShop, setListHeaderShop] = React.useState([]);
    const [listProduct, setListProduct] = React.useState([]);
    const router = useRouter();
    let paramsa = { ...router.getAll() };

    const [valueName, setValueName] = React.useState(paramsa?.name);
    const [valueFrom, setValueFrom] = React.useState(paramsa.from);
    const [valueTo, setValueTo] = React.useState(paramsa.to);
    const getListProduct = async (cate = null) => {
        let params = { ...router.getAll() };
        router.push({
            params: {
                from: valueFrom,
                to: valueTo,
                name: valueName,
            }
        })
        dispatch({
            type: ProductAction.GET_LIST_PRODUCT,
            data: {
                idCategory: cate,
                stockfirst: valueFrom ?? params.from,
                stocklast: valueTo ?? params.to,
                productName: valueName ?? params.name,
            },
            onSuccess: (data) => {
                setListProduct([])
                setListProduct(data?.data?.result?.items)
                // setListProduct([])
            },
        })
    }
    const getListCategorys = async () => {
        dispatch({
            type: CategoryAction.GET_LIST_CATEGORY,
            onSuccess: (data) => {
                setListHeaderShop(data?.data?.result?.result)
            },
        })
    }
    const deleteProductById = async (id) => {
        dispatch({
            type: ProductAction.DELETE_PRODUCT,
            data: { idProduct: id },
            onSuccess: (data) => {
                getListProduct()
                Utils.showSuccessToast({
                    message: "Xóa sản phẩm thành công",
                })
            },
        })
    }
    React.useEffect(() => {
        getListProduct()
        getListCategorys()
    }, [])

    var listItem = (listHeaderShop?.length !== 0 && listHeaderShop !== null) ?  listHeaderShop?.map((item) => {
        return {
            key: item?.id,
            label: item?.name,
        }
    }) : []

    const render = (listProducts) => {
        return (listProducts.map((row) => (
            <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    sx={{ maxWidth: '250px', maxHeight: '200px' }}
                >
                    {row.name}
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    sx={{ maxWidth: '200px' }}
                >
                    <img
                        src={row?.avtImageUrl}
                        width={150}
                        height={150}
                    />
                </TableCell>
                <TableCell
                    align="right"
                    sx={{ minWidth: '100px' }}
                >
                    {convertStringToNumber(row.price?.toString(), true)}
                </TableCell>
                <TableCell
                    align="right"
                    sx={{ maxWidth: '80px' }}
                >
                    {row?.importQuantity}
                </TableCell>
                <TableCell
                    align="right"
                    sx={{ maxWidth: '80px' }}
                >
                    <IconButton
                        onClick={(e) => {
                            setValue(null, 1)
                            router.push({
                                params: {
                                    id: row.id,
                                }
                            })
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </TableCell>
                <TableCell
                    align="right"
                    sx={{ maxWidth: '80px' }}
                >
                    <IconButton
                        onClick={() => {
                            deleteProductById(row.id)
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        )))
    }
    return (
        <div className={styles.admin}>
            {/* <div className={styles.menuleft}>
                <MenuLeft />
            </div> */}
            <ToastContainer />
            <div
                style={{
                    // margin: '10px',
                    width: '1100px',
                    height: '128px',
                    borderRadius: '10px',
                    boxShadow: ' rgba(149, 157, 165, 0.41) 0px 8px 24px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: '300px'
                }}
            >
                <div
                    style={{
                        margin: '10px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontSize: '15px',
                        paddingTop: '8px',
                        paddingLeft: '15px'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                        }}
                    >
                        <div
                            style={{ minWidth: '110px' }}
                        >
                            Tên sản phẩm:
                        </div>
                        <input
                            name='search_name'
                            value={valueName}
                            onChange={(e) => {
                                setValueName(e.target.value)
                            }}
                            style={{
                                width: '200px',
                                borderRadius: '5px',
                                border: '1px solid #031200',
                                height: '32px',
                                paddingLeft: '10px'
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                            alignItems: 'center'
                        }}
                    >
                        <div
                            style={{ minWidth: '95px' }}
                        >
                            Tồn kho:
                        </div>
                        <input
                            // variant="outlined"
                            height='32px'
                            label="Giá từ"
                            type="number"
                            value={valueFrom}
                            onChange={(e) => {
                                setValueFrom(e.target.value)
                            }}
                            inputProps={{
                                style: {
                                    height: '10px',
                                    padding: '5 5',
                                },
                            }}
                            style={{
                                width: '75px',
                                borderRadius: '5px',
                                border: '1px solid #031200',
                                height: '32px',
                                marginLeft: '10px',
                                paddingLeft: '10px'
                            }}
                            InputLabelProps={{ style: { fontSize: 13 } }}
                        // sx={{ width: '80px', marginLeft: '10px' }}
                        />
                        __
                        <input
                            height='32px'
                            label="Giá đên"
                            type="number"
                            inputProps={{
                                style: {
                                    height: '10px',
                                    padding: '5 5',
                                },
                            }}
                            value={valueTo}
                            onChange={(e) => {
                                setValueTo(e.target.value)
                            }}
                            style={{
                                width: '75px',
                                borderRadius: '5px',
                                border: '1px solid #031200',
                                height: '32px',
                                marginLeft: '10px',
                                paddingLeft: '10px'
                            }}
                            // defaultValue="Giá đến"
                            InputLabelProps={{ style: { fontSize: 13 } }}
                        />
                    </div>
                    <h6 style={{ fontWeight: '700' }}>
                        Tổng: {listProduct.length}
                    </h6>
                </div>
                <div
                    style={{
                        marginLeft: '50px',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '30px',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div>
                        Danh mục
                    </div>
                    <div>
                        <Autocomplete
                            options={listItem}
                            variant="outlined"
                            getOptionLabel={(option) => option.label}
                            sx={{
                                width: 200,
                            }}
                            onChange={(e, item) => {
                                setListProduct([])
                                getListProduct(item?.key)
                            }}
                            renderInput={(params) =>
                                <TextField
                                    fullWidth
                                    sx={styleTextField}
                                    variant="outlined"
                                    {...params}
                                />}
                        />
                    </div>
                </div>
                <button
                    style={{
                        marginLeft: '50px',
                        width: '129px',
                        height: '44px',
                        background: '#333333',
                        borderRadius: '5px',
                        color: '#FFFFFF',
                        fontSize: '15px'
                    }}
                    onClick={(e) => {
                        getListProduct()
                    }}
                >
                    Tìm kiếm
                </button>
                <button
                    style={{
                        marginLeft: '30px',
                        width: '129px',
                        height: '44px',
                        background: '#333333',
                        borderRadius: '5px',
                        color: '#FFFFFF',
                        fontSize: '15px'
                    }}
                >
                    Thiết lập lại
                </button>
            </div>
            <div
                style={{
                    margin: '20px 10px',
                    width: '1100px',
                    height: '420px',
                    borderRadius: '10px',
                    boxShadow: ' rgba(149, 157, 165, 0.41) 0px 8px 24px',
                    marginLeft: '300px'
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ width: '1000px', maxWidth: '1000px' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: '700' }}>Tên sản phẩm</TableCell>
                                <TableCell style={{ fontWeight: '700' }} align="center">Hình ảnh</TableCell>
                                <TableCell style={{ fontWeight: '700' }} align="right">Giá</TableCell>
                                <TableCell style={{ fontWeight: '700' }} align="right">Số lượng tồn kho</TableCell>
                                <TableCell style={{ fontWeight: '700' }} align="right">Chi tiết sản phẩm</TableCell>
                                <TableCell style={{ fontWeight: '700' }} align="right">Xóa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {listProduct.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="left"
                                        sx={{ maxWidth: '250px', maxHeight: '200px' }}
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                        sx={{ maxWidth: '200px' }}
                                    >
                                        <img
                                            src={row?.avtImageUrl}
                                            width={150}
                                            height={150}
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ minWidth: '100px' }}
                                    >
                                        {convertStringToNumber(row.price?.toString(), true)}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ maxWidth: '80px' }}
                                    >
                                        {10}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ maxWidth: '80px' }}
                                    >
                                        <IconButton
                                            onClick={(e) => {
                                                setValue(null, 1)
                                                router.push({
                                                    params: {
                                                        id: row.id,
                                                    }
                                                })
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ maxWidth: '80px' }}
                                    >
                                        <IconButton
                                            onClick={() => {
                                                deleteProductById(row.id)
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))} */}
                            {render(listProduct)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
export default Product;