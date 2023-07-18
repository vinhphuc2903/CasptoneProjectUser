import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';

const GetProduct = {
    requestGetProduct: (data) =>
        ApiOperation.request({
            url: ApiConstants.LIST_PRODUCT,
            method: 'GET',
            params: { PageSize: 200, ...data },
        })
}

const GetProductByCategory = {
    requestGetProductByCategory: (data) => 
        ApiOperation.request({
            url: ApiConstants.LIST_PRODUCT_BY_CATEGORY,
            method: 'GET',
            params: data,
        })
}

const AddProduct = {
    requestAddProduct: (data) => 
        ApiOperation.request({
            url: ApiConstants.ADD_PRODUCT,
            method: 'POST',
            data: data,
        })
}

const DeleteProduct = {
    requestDeleteProduct: (data) => 
        ApiOperation.request({
            url: ApiConstants.DELETE_PRODUCT,
            method: 'DELETE',
            params: data,
        })
}

const GetProductById = {
    requestGetProductById: (data) => 
        ApiOperation.request({
            url: ApiConstants.GET_PRODUCT_BY_ID,
            method: 'GET',
            params: data,
        })
}
const GetBestSeller = {
    requestGetBestSeller: (data) => 
        ApiOperation.request({
            url: ApiConstants.GET_BEST_SELLER,
            method: 'GET',
            params: data,
        })
}

export { GetProduct, GetProductByCategory, AddProduct, DeleteProduct, GetProductById, GetBestSeller } 

