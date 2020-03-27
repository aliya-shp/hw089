import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const ADD_TO_HISTORY_SUCCESS = 'ADD_TO_HISTORY_SUCCESS';
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS';
export const DELETE_TRACK_SUCCESS = 'DELETE_TRACK_SUCCESS';

export const fetchTracksSuccess = tracks => ({type : FETCH_TRACKS_SUCCESS, tracks});
export const addToHistorySuccess = () => ({type : ADD_TO_HISTORY_SUCCESS});
export const createTrackSuccess = () => ({type : CREATE_TRACK_SUCCESS});
export const deleteTrackSuccess = () => ({type: DELETE_TRACK_SUCCESS});

export const fetchTracks = albumId => async dispatch => {
    try {
        const response = await axiosApi.get('/tracks?album=' + albumId);
        dispatch(fetchTracksSuccess(response.data));
    } catch (error) {
        console.log(error);
    }
};
export const addToHistory = track => async (dispatch,getState) => {
    try {
        const token = getState().user.user;
        await axiosApi.post('/track_history',{track : track}, {headers : {Authorization : 'Token ' + token.token}});
        dispatch(addToHistorySuccess());
    } catch (error) {
        console.log(error);
    }
};

export const createTrack = trackData => async dispatch => {
    try {
        await axiosApi.post('/tracks', trackData);
        dispatch(createTrackSuccess());
        dispatch(push('/'));
    } catch (error) {
        console.log(error);
    }
};
export const deleteTrack = (trackId, albumId) => async dispatch => {
    try {
        await axiosApi.delete('/tracks/' + trackId);
        dispatch(deleteTrackSuccess());
        dispatch(fetchTracksSuccess(albumId));
    } catch (error) {
        console.log(error);
    }
};