import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const FETCH_ARTIST_ALBUMS_SUCCESS = 'FETCH_ARTIST_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const PUBLISH_ALBUM_SUCCESS = 'PUBLISH_ALBUM_SUCCESS';

export const fetchArtistAlbumsSuccess = albums => ({type: FETCH_ARTIST_ALBUMS_SUCCESS, albums});
export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const createAlbumSuccess = () => ({type: CREATE_ALBUM_SUCCESS});
export const deleteAlbumSuccess = () => ({type: DELETE_ALBUM_SUCCESS});
export const publishAlbumSuccess = () => ({type: PUBLISH_ALBUM_SUCCESS});

export const fetchArtistAlbums = artistId => async dispatch => {
    try {
        const response = await axiosApi.get('/albums?artist=' + artistId);
        dispatch(fetchArtistAlbumsSuccess(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const fetchAlbums = () => async dispatch => {
    try {
        const response = await axiosApi.get('/albums');
        dispatch(fetchAlbumsSuccess(response.data));
    } catch (error) {
        console.log(error);
    }
};
export const createAlbum = (albumData) => async dispatch => {
    try {
        await axiosApi.post('albums',albumData);
        dispatch(createAlbumSuccess());
        dispatch(push('/'));
    } catch (error) {
        console.log(error);
    }
};
export const deleteAlbum = (albumId, artistId) => async dispatch => {
    try {
        await axiosApi.delete('/albums/' + albumId);
        dispatch(deleteAlbumSuccess);
        dispatch(fetchArtistAlbumsSuccess(artistId));
    } catch (error) {
        console.log(error);
    }
};
export const publishAlbum = (albumId, artistId) =>  async dispatch => {
    try {
        await axiosApi.post('/albums/' + albumId + '/published');
        dispatch(publishAlbumSuccess());
        dispatch(fetchArtistAlbumsSuccess(artistId));
    } catch (error) {
        console.log(error);
    }
};