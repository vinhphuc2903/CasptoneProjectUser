import React, { useState } from 'react'
// import { useRef } from 'react';
import styles from "./AddProduct.module.scss"
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form'
import Autocomplete from "@mui/material/Autocomplete";
import CategoryAction from "../../../redux/category/action";
import ProductAction from '../../../redux/product/action';
import ImagePicker from '../../common/image-up-loading/ImageUpLoading';
import { TextLabel } from '@findxdn/erp-theme';
import { ToastContainer, toast } from 'react-toastify';
import useRouter from '../../../hooks/use-router';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Laptop from './common/Laptop';
import PCDetail from './common/PCDetail';
import MonitorDetail from './common/MonitorDetail';
import Accessories from './common/Accessories';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const heightVar = window.innerHeight - 190;
const toolbarConfig = {
  height: heightVar,
  toolbar: 'Full',
  allowedContent: true,
  startupFocus: true,
  toolbarGroups: [
    { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
    { name: 'forms', groups: [ 'forms' ] },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
    { name: 'links', groups: [ 'links' ] },
    { name: 'insert', groups: [ 'insert' ] },
    { name: 'styles', groups: [ 'styles' ] },
    { name: 'colors', groups: [ 'colors' ] },
    { name: 'tools', groups: [ 'tools' ] },
    { name: 'others', groups: [ 'others' ] },
    { name: 'about', groups: [ 'about' ] }
  ],
  removeButtons: 'PasteFromWord,Image,Source,Save,NewPage,Preview,Templates,Cut,Copy,Paste,PasteText,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Link,Unlink,Anchor,Flash,Smiley,SpecialChar,PageBreak,Iframe,Styles,Maximize,ShowBlocks,About,Language',
  removePlugins: 'elementspath',
};

const styleTextField = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "3px",
        height: "55px",
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

function AddProduct(props) {
    const { setValues } = props;
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        var datas = "";
        var dataInput = new Object();

        Object.keys(data).map((item) => {
            if( item !== 'Name' && item !== 'Price' && item !== 'Color' && item != 'Description' && item !== 'Weight' && item != 'ImportQuantity' && item!= 'IdCategory' && item != 'imageUrl' && item != 'uploadImage')
            {
                datas =item + '/' + data[item] + '//' + datas 
            }
            else if(item === 'Name'){
                dataInput.Name = data[item]
            }
            else if(item === 'Price'){
                dataInput.Price = data[item]
            }
            else if(item === 'Color'){
                dataInput.Color = data[item]
            }
            else if(item === 'Description'){
                dataInput.Description = data[item]
            }
            else if(item === 'Weight'){
                dataInput.Weight = data[item]
            }
            else if(item === 'Description'){
                dataInput.Description = data[item]
            }
            else if(item === 'Weight'){
                dataInput.Weight = data[item]
            }
            else if(item === 'ImportQuantity'){
                dataInput.ImportQuantity = data[item]
            }
            else if(item === 'IdCategory'){
                dataInput.IdCategory = data[item]
            }
            else if(item === 'imageUrl'){
                dataInput.imageUrl = data[item]
            }
            else if(item === 'uploadImage'){
                dataInput.uploadImage = data[item]
            }
        })

        dataInput.Detail = datas
        
        addProduct(dataInput)
    }

    const [listHeaderShop, setListHeaderShop] = React.useState([]);
    const dispatch = useDispatch()

    const getListCategorys = async () => {
        await dispatch({
            type: CategoryAction.GET_LIST_CATEGORY,
            onSuccess: (data) => {
                setListHeaderShop(data?.data?.result?.result)
            },
        })
    }
    const notify = () => toast("Thêm sản phẩm thất bại, vui lòng kiểm tra lại")
    const addProduct = (data) => {
        dispatch({
            type: ProductAction.ADD_PRODUCT,
            data: data,
            onSuccess: (datas) => {
                setValues(null, 0)
                toast("Thêm sản phẩm thành công")
            },
            onError: (data) => {
                notify()
            },
        })
    }
    var listItem = listHeaderShop?.map((item) => {
        if(item?.parentId !== 0)
        {
            return {
                key: item?.id,
                label: item?.name,
            }
        }
        return null
    })
    Object.keys(listItem).forEach(key => {
        if (listItem[key] === null) {
          delete listItem[key];
        }
      });

    const router = useRouter();
    let params = { ...router.getAll() };
    const getProduct = async() => {
        dispatch({
            type: ProductAction.GET_PRODUCT_BY_ID,
            data: { IdProduct: params?.id },
            onSuccess: (data) => {
                const values = data?.data?.result;
                setValue('Name', values?.name)
                setValue('Price', values?.price)
                setValue('Weight', values?.weight)
                setValue('Description', values?.description)
                setValue('Color', values?.color)
                setValue('uploadImage', values?.avtImageUrl)
                setValue('imageUrl', values?.imageUrl)
                setValue('ImportQuantity', values?.importQuantity)
                // setValue('IdCategory', 2)
            },
        })
    }   
    React.useEffect(() => {
        getProduct()
        getListCategorys()
    }, [])

    const [valueIdCate, setValueIdCate] = React.useState(-1);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer />
            <div className={styles.rightpage}>
                <div className={styles.infoProduct}>
                    <div style={{ fontWeight: '700', fontSize: '20px', paddingTop: '10px', paddingLeft: '15px', marginBottom: '30px' }}>
                        { typeof params?.id !== 'undefined' ? 'Chi tiết sản phẩm' : 'Thêm sản phẩm' }    
                    </div>
                    <div className={styles.Detail}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <TextLabel>
                                    Tên sản phẩm
                                </TextLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { ref, ...rest } }) => (
                                        <TextField
                                            {...rest}
                                            // _props={{ inputRef: ref }}
                                            // label='Nhập tên sản phẩm '
                                            variant="outlined"
                                            InputLabelProps={{ style: { fontSize: 13 } }}
                                            sx={{
                                                width: '400px',
                                            }}
                                        />
                                    )}
                                    name="Name"
                                />
                                {errors?.Name?.type === "required" && (
                                    <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập tên sản phẩm! </p>)}
                            </div>

                            <div>
                                <TextLabel>
                                    Giá sản phẩm
                                </TextLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { ref, ...rest } }) => (
                                        <TextField
                                            {...rest}
                                            // label='Giá '
                                            type='number'
                                            variant="outlined"
                                            sx={{ width: '400px' }}
                                            InputProps={{ inputProps: { min: 1, max: 10000000000 } }}
                                            InputLabelProps={{ style: { fontSize: 13 } }}
                                        />
                                    )}
                                    name="Price"
                                />
                                {errors?.Price?.type === "required" && (
                                    <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập giá sản phẩm! </p>)}
                            </div>
                            <div>
                                <TextLabel>
                                    Màu sắc
                                </TextLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { ref, ...rest } }) => (
                                        <TextField
                                            {...rest}
                                            // label='Màu sắc '
                                            variant="outlined"
                                            sx={{ width: '400px' }}
                                            InputLabelProps={{ style: { fontSize: 13 } }}
                                        />
                                    )}
                                    name="Color"
                                />
                                {errors?.Color?.type === "required" && (
                                    <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng màu sắc sản phẩm! </p>)}
                            </div>
                            <div
                                style={{ height: '500px'}}
                                className={styles.mt}
                            >
                                <TextLabel>
                                    Mô tả
                                </TextLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    defaultValue={null}
                                    render={({ field: { onChange, value, ref, ...rest } }) => (
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data={value}
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                onChange(data)
                                            }}
                                            sx={{ maxHeight: '200px'}}
                                            {...rest}
                                        />
                                    )}
                                    name="Description"
                                />
                                {errors?.Description?.type === "required" && (
                                    <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập mô tả sản phẩm! </p>)}
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <TextLabel>
                                    Cân nặng
                                </TextLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { ...rest } }) => (
                                        <TextField
                                            {...rest}
                                            variant="outlined"
                                            type='number'
                                            sx={{ width: '400px' }}
                                            InputLabelProps={{ style: { fontSize: 13 } }}
                                            InputProps={{ inputProps: { min: 1, max: 100 } }}
                                        />
                                    )}
                                    name="Weight"
                                />
                                 {errors?.Weight?.type === "required" && (
                                    <p style={{ color: 'red', marginBottom: 0 }}>Cân lượng nhập kho khác 0! </p>)}
                            </div>
                            <div>
                                <TextLabel>
                                    Số lượng
                                </TextLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { ...rest } }) => (
                                        <TextField
                                            {...rest}
                                            type='number'
                                            variant="outlined"
                                            sx={{ width: '400px' }}
                                            InputProps={{ inputProps: { min: 1, max: 1000000 } }}
                                            InputLabelProps={{ style: { fontSize: 13 } }}
                                        />
                                    )}
                                    name="ImportQuantity"
                                />
                                {errors?.ImportQuantity?.type === "required" && (
                                    <p style={{ color: 'red', marginBottom: 0 }}>Số lượng nhập kho khác 0! </p>)}
                            </div>
                            <div>
                                <TextLabel>
                                    Danh mục
                                </TextLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { ref, onChange, ...rest } }) => (
                                        <Autocomplete
                                            {...rest}
                                            rules={{
                                                required: true,
                                            }}
                                            disablePortal
                                            options={listItem}
                                            getOptionLabel={(option) => option.label}
                                            sx={{
                                                width: 400,
                                                height: 55
                                            }}
                                            
                                            variant="outlined"
                                            onChange={(e, item) => {
                                                setValueIdCate(item?.key)
                                                onChange(item?.key)
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    sx={styleTextField}
                                                    variant="outlined"
                                                />}
                                        />
                                    )}
                                    name="IdCategory"
                                />
                                 {errors?.IdCategory?.type === "required" && (
                                    <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng chọn danh mục sản phẩm! </p>)}
                            </div>
                        

                            {   ([1, 7, 8, 9, 10, 11, 12, 13].includes(valueIdCate) ? (<Laptop control={control} errors={errors} />) : <></>) }
                            {   ([2, 14, 15].includes(valueIdCate) ? (<PCDetail control={control} errors={errors} />) : <></>)}
                            {   ([3, 16, 17, 18].includes(valueIdCate) ? (<MonitorDetail control={control} errors={errors} />) : <></>)}
                            {   ([4, 19, 20, 21, 22].includes(valueIdCate) ? (<Accessories control={control} errors={errors} />) : <></>)}
                            {/* {   ([5].includes(valueIdCate) ? (<PCDetail control={control} errors={errors} />) : <></>)}
                            {   ([6].includes(valueIdCate) ? (<PCDetail control={control} errors={errors} />) : <></>)}
                            {   ([7].includes(valueIdCate) ? (<PCDetail control={control} errors={errors} />) : <></>)} */}
                            </div>
                        </div>
                    <div className={styles.imgProduct}>
                        <div>
                            <TextLabel>
                                Ảnh sản phẩm
                                <span>*</span>
                            </TextLabel>
                            <Controller
                                control={control}
                                name='uploadImage'
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { ...rest } }) => (
                                    <ImagePicker
                                        {...rest}
                                        // defaultValue={getValues('avataImage')}
                                        // value={value}
                                    />
                                )}
                            />
                            {errors?.uploadImage?.type === "required" && (
                                <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng tải ảnh sản phẩm! </p>)}
                        </div>
                        <div>
                            <TextLabel>
                                Ảnh chi tiết sản phẩm
                            </TextLabel>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                name='imageUrl'
                                render={({ field: { ...rest } }) => (
                                    <ImagePicker
                                        {...rest}
                                        multiple
                                    />
                                )}
                            />
                            {errors?.imageUrl?.type === "required" && (
                                <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng tải ảnh chi tiết sản phẩm! </p>)}
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
                            onClick={e => {
                                setValue('Color', '')
                                setValue('IdCategory', '')
                                setValue('ImportQuantity', '')
                                setValue('Name', '')
                                setValue('Keyword', '')
                                setValue('Weight', '')
                                setValue('Color', '')
                                setValue('AvtImage', {})
                                setValue('Description', '')
                                setValue('Name', '')
                                setValue('Detail', '')
                                setValue('Price', '')
                            }}
                        >
                            Thiết lập lại
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default AddProduct;