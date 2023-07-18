import ApiConstants from '../../adapter/ApiConstants';
import ApiOperation from '../../adapter/ApiOperation';

const GetFilmFactory = {
    requestGetAllFilm: (params) =>
        ApiOperation.request({
            url: ApiConstants.GET_ALL_FILM,
            method: 'GET',
            params: params
        }),
    }
const GetDetailFilmFactory = {
    requestGetDetailFilm: (param) =>
        ApiOperation.fetchSingle(
            ApiConstants.GET_DETAIL_FILM,
            param
        ),
    }
const GetDetailShowTimeFactory = {
    requestGetDetailShowTime: (param) =>
        ApiOperation.fetchSingle(
            ApiConstants.GET_DETAIL_SHOWTIME,
            param
        ),
    }
const GetShowtimeByBranchFactory = {
    requestGetShowtimeByBranchFactory: (params) =>
        ApiOperation.request({
            url: ApiConstants.GET_SHOWTIME_BY_BRANCH,
            method: 'GET',
            params: params
        }),
    }

export { GetFilmFactory, GetDetailFilmFactory, GetDetailShowTimeFactory, GetShowtimeByBranchFactory }