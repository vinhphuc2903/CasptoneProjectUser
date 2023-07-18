import ApiConstants from '../../adapter/ApiConstants';
import ApiOperation from '../../adapter/ApiOperation';

const GetCommentFactory = {
    requestgetComments: (param) =>
        ApiOperation.request({
            url: ApiConstants.GET_COMMENT,
            method: 'GET',
            params: param
        }),
    }
const AddCommentFactory = {
    requestaddComments: (data) =>
        ApiOperation.request({
            url: ApiConstants.ADD_COMMENT,
            method: 'POST',
            data: data
        }),
    }
const DeleteCommentFactory = {
    requestdeleteComments: (param) =>
        ApiOperation.request({
            url: ApiConstants.DELETE_COMMENT,
            method: 'DELETE',
            params: param
        }),
}

export { GetCommentFactory, AddCommentFactory, DeleteCommentFactory }