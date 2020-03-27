import {FETCH_TRACKS_SUCCESS} from "../actions/tracksActions";

const initialState = {
    tracks: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_SUCCESS:
            return { ...state, tracks: action.tracks };
        default:
            return state
    }
};

export default reducer;