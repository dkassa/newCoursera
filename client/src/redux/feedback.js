import * as ActionTypes from './ActionTypes';



export const Feedbacks = (state = {
    isLoading:false,
    errMess:null,
    feedbacks:[]
        
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FEEDS:
            return {...state, isLoading: false, errMess: null, feedbacks: action.payload};

        case ActionTypes.FEED_LOADING:
            return {...state, isLoading: true, errMess: null, feedbacks: []};

        case ActionTypes.FEED_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feedbacks: []};

        default:
            return state;
    }
}