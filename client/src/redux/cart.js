import * as ActionTypes from './ActionTypes';

export const Carts = (state = {
        isLoading: true,
        errMess: null,
        carts: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CARTS:
            return {...state, isLoading: false, errMess: null, carts: action.payload};

        case ActionTypes.CARTS_LOADING:
            return {...state, isLoading: true, errMess: null, carts: []};

        case ActionTypes.CARTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, carts: []};

        default:
            return state;
    }
}