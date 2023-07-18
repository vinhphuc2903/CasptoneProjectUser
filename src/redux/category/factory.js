import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';

const GetCategory = {
    requestGetCategory: (data) =>
        ApiOperation.request({
            url: ApiConstants.CATEGORY,
            method: 'GET',
        })
}

const GetTreeCategory = {
    requestGetTreeCategory: (data) => 
        ApiOperation.request({
            url: ApiConstants.TREE_CATEGORY,
            method: 'GET',
        })
}

export { GetCategory, GetTreeCategory } 

