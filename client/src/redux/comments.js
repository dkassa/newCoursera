import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
        errMess: null,
        comments: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, comments: []};

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};


        case ActionTypes.DELETE_COMMENT:

       
            return {
                ...state, isLoading: false ,errMess: null, comments: state.comments.filter((i) => i._id !== action.payload)
            };

        default:
            return state;
    }
}