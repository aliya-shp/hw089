import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const ADD_ARTIST_SUCCESS = 'ADD_ARTIST_SUCCESS';
export const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';
export const PUBLISH_ARTIST_SUCCESS = 'PUBLISH_ARTIST_SUCCESS';

export const getArtistsSuccess = artists => ({type : GET_ARTISTS_SUCCESS, artists});
export const addArtistSuccess = () => ({type : ADD_ARTIST_SUCCESS});
export const deleteArtistSuccess = () => ({type : DELETE_ARTIST_SUCCESS});
export const publishArtistSuccess = () => ({type : PUBLISH_ARTIST_SUCCESS});

export const getArtists = () => async dispatch => {
    try {
        const response = await axiosApi.get('/artists');
        dispatch(getArtistsSuccess(response.data));
    } catch (error) {
        console.log(error);
    }
};
export const addArtist = artistData => async dispatch => {
    try {
        await axiosApi.post('/artists',artistData);
        dispatch(addArtistSuccess());
        dispatch(push('/'));
    } catch (e) {
        console.log(e);
    }
};
export const deleteArtist = artistId => async dispatch => {
    try {
        await axiosApi.delete('/artists/' + artistId);
        dispatch(deleteArtistSuccess());
        dispatch(getArtistsSuccess());
    } catch (error) {
        console.log(error);
    }
};
export const publishArtist = artistId =>  async dispatch => {
    try {
        await axiosApi.post('/artists/' + artistId + '/published');
        dispatch(publishArtistSuccess());
        dispatch(getArtistsSuccess());
    } catch (error) {
        console.log(error);
    }
};