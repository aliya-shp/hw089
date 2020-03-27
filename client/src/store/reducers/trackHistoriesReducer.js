import {FETCH_TRACK_HISTORIES_SUCCESS} from "../actions/trackHistoriesActions";

const initialState = {
    trackHistories: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACK_HISTORIES_SUCCESS:
            return { ...state, trackHistories: action.trackHistories };
        default:
            return state;
    }
};

export default reducer;