import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';

const AddToCart = {
    requestAddToCart: (data) => 
        ApiOperation.request({
            url: ApiConstants.ADD_TO_CART,
            method: 'POST',
            data: data,
        })
}

const DeleteProductToCart = {
    requestDeleteProductToCart: (data) => 
        ApiOperation.request({
            url: ApiConstants.DELETE_PRODUCT_TO_CART,
            method: 'PUT',
            params: data,
        })
}

const UpdateCart = {
    updateToCart: (data) => 
        ApiOperation.request({
            url: ApiConstants.UPDATE_CART,
            method: 'PUT',
            data: data,
        })
}
export { AddToCart, DeleteProductToCart, UpdateCart } 

