import {GET_ARTISTS_SUCCESS} from "../actions/artistsActions";

const initialState = {
    artists: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTISTS_SUCCESS:
            return { ...state, artists: action.artists };
        default:
            return state;
    }
};

export default reducer;