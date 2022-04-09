import { LIVE } from './const';

function liveReducer (state = [], action){
    switch (action.type) {
        case LIVE:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}
export default liveReducer;