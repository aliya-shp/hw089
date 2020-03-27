import axiosApi from '../../axiosApi';

export const FETCH_TRACK_HISTORIES_SUCCESS = 'FETCH_TRACK_HISTORIES_SUCCESS';

export const fetchTrackHistoriesSuccess = trackHistories => ({type: FETCH_TRACK_HISTORIES_SUCCESS, trackHistories});

export const fetchTrackHistories = () => async (dispatch,getState) => {
    try {
        const token = getState().user.user;
        const response = await axiosApi.get('/track_history',{headers : {Authorization : 'Token ' + token.token}});
        dispatch(fetchTrackHistoriesSuccess(response.data));
    } catch (error) {
        console.log(error);
    }
};