
import React, { useState, useEffect } from 'react'
import ImageUploading from 'react-images-uploading'

// import {IconUserHr, IcCloseSmall} from 'assets/images/icons/icon-list'
import { Icupload, IcCloseSmall } from '../../../assets/icons/list-Icon'

function ImagePicker(props) {
    const {defaultValue,  imageRef, width= 250, height = 250, multiple = false } = props
    const [images, setImages] = React.useState([]);

    useEffect(()=>{
        if(defaultValue){
            setImages([{
                data_url: defaultValue
            }])
        }
    },[defaultValue]);

    const maxNumber = 69;

    const onChange = (imageList, ref) => {
        setImages(imageList)
        props.onChange(imageList)
    }

    return (
        <ImageUploading
            value={images}
            onChange={(imageList) => onChange(imageList)}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            multiple={multiple}
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
            }) => {
                return (
                    <div className="upload__image-wrapper">
                        
                        {!imageList.length && <div className="avatar-icon" onClick={onImageUpload}>
                            <Icupload/>
                            <div style={{marginTop: 20}}>
                                <p style={{color: '#9F9F9F', lineHeight: 1.3}}>Tải ảnh lên từ thiết bị</p>
                            </div>
                        </div>}
                                        
                        {imageList.map((image, index) => {
                            return (
                                <div key={index} className="image-item" onClick={onImageUpload}>
                                    <img src={image['data_url']} alt="" width={width} height={height}/>
                                    <div  className = "image-item-delete" onClick={(e)=>{setImages([]) 
                                        e.stopPropagation();} } >
                                        <IcCloseSmall  />
                                    </div>
                                </div>
                            )
                        })}
                                        
                    </div>
                )
            }}
        </ImageUploading>
    )
}

export default ImagePicker
