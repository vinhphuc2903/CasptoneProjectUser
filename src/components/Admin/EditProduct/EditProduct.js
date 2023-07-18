import React from "react";
import { ToastContainer } from "react-toastify";
import styles from '../EditProduct/EditProduct.module.scss';
import MenuLeft from '../../MenuLeft/MenuLeft'
import { TextLabel } from '@findxdn/erp-theme';
import { ListItemButton, TextareaAutosize, TextField } from "@mui/material";
import { style } from "@mui/system";
import ImagePicker from '../../common/image-up-loading/ImageUpLoading';
import Button from '@mui/material/Button';
import useRouter from "../../../hooks/use-router";
import { useDispatch } from 'react-redux';
import ProductAction from "../../../redux/product/action";

function EditProduct() {
    const router = useRouter();
    const [product, setListProduct] = React.useState([]);
    const dispatch = useDispatch();
    const getProduct = async() => {
        let params = { ...router.getAll() };
        dispatch({
            type: ProductAction.GET_PRODUCT_BY_ID,
            data: { IdProduct: params?.id },
            onSuccess: (data) => {
                setListProduct(data?.data?.result)
            },
        })
    }   
    React.useEffect(() => {
        getProduct()
    }, [])
    
    return (
        <div className={styles.EditProduct}>
            <MenuLeft />
            <div className={styles.rightpage} >
                <div className={styles.infoProduct}>
                    <div style={{ fontWeight: '700', fontSize: '20px', paddingTop: '10px', paddingLeft: '15px', marginBottom: '30px' }}>Sửa thông tin sản phẩm</div>
                    <div className={styles.Detail}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <TextLabel>
                                    Tên sản phẩm
                                </TextLabel>
                                <TextField
                                    // _props={{ inputRef: ref }}
                                    label='Nhập tên sản phẩm '
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{
                                        width: '400px',
                                    }}
                                />
                            </div>

                            <div>
                                <TextLabel>
                                    Giá sản phẩm
                                </TextLabel>
                                <TextField
                                    // _props={{ inputRef: ref }}
                                    label='Nhập tên sản phẩm '
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{
                                        width: '400px',
                                    }}
                                />
                            </div>
                            <div>
                                <TextLabel>
                                    Màu sắc
                                </TextLabel>
                                <TextField
                                    // _props={{ inputRef: ref }}
                                    label='Nhập tên sản phẩm '
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{
                                        width: '400px',
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    minHeight: '400px',
                                    maxHeight: '400px'
                                }}
                            >
                                <TextLabel>
                                    Mô tả
                                </TextLabel>

                                <TextareaAutosize
                                    label='Mô tả '
                                    variant="outlined"
                                    minRows={5}
                                    style={{ width: '400px', paddingLeft: '20px' }}
                                />

                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <TextLabel>
                                    Cân nặng
                                </TextLabel>
                                <TextField
                                    // _props={{ inputRef: ref }}
                                    label='Nhập tên sản phẩm '
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{
                                        width: '400px',
                                    }}
                                />
                            </div>

                            <div>
                                <TextLabel>
                                    Số lượng
                                </TextLabel>
                                <TextField
                                    // _props={{ inputRef: ref }}
                                    label='Nhập tên sản phẩm '
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{
                                        width: '400px',
                                    }}
                                />
                            </div>
                            <div>
                                <TextLabel>
                                    Danh mục
                                </TextLabel>
                                <TextField
                                    // _props={{ inputRef: ref }}
                                    label='Nhập tên sản phẩm '
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{
                                        width: '400px',
                                    }}
                                />
                            </div>
                            <div>
                                <TextLabel>
                                    Chi tiết
                                </TextLabel>

                                <TextareaAutosize
                                    label='Chi tiết'
                                    variant="outlined"
                                    minRows={5}
                                    style={{ width: '400px', paddingLeft: '20px' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.imgProduct}>
                        <div>
                            <TextLabel>
                                Ảnh sản phẩm
                                <span>*</span>
                            </TextLabel>
                            <ImagePicker />
                        </div>
                        <div>
                            <TextLabel>
                                Ảnh sản phẩm
                                <span>*</span>
                            </TextLabel>
                            <ImagePicker />
                        </div>
                    </div>
                    <div className={styles.submitButton}>
                        <Button
                            type='submit'
                            className={styles.buttonStyle}
                            style={{
                                width: '120px',
                                backgroundColor: '#333333',
                                color: '#FFFFFF',
                                height: '38px',
                                fontWeight: '500',
                                fontSize: '14'
                            }}
                        >
                            Lưu
                        </Button>
                        <Button
                            className={styles.buttonStyle}
                            style={{
                                marginLeft: '40px',
                                width: '120px',
                                backgroundColor: '#333333',
                                color: '#FFFFFF',
                                height: '38px',
                                fontWeight: '500',
                                fontSize: '14'
                            }}
                        >
                            Thiết lập lại
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default EditProduct;