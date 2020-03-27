import {FETCH_ARTIST_ALBUMS_SUCCESS, FETCH_ALBUMS_SUCCESS} from "../actions/albumsActions";

const initialState = {
    albums: [],
    allAlbums: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTIST_ALBUMS_SUCCESS:
            return { ...state, albums: action.albums };
        case FETCH_ALBUMS_SUCCESS:
            return { ...state, allAlbums: action.albums };
        default:
            return state
    }
};

export default reducer;