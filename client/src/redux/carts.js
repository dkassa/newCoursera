import * as ActionTypes from './ActionTypes';

export const Carts = (state = {
        cartsLoading: false,
        errMess: null,
        Carts: null,
        
    
    }, action) => {
    switch(action.type) {

        case ActionTypes.CARTS_LOADING:
            return {...state, cartsLoading: true, errMess: null, Carts: null};

        case ActionTypes.ADD_CARTS:
            return {...state, cartsLoading: false, errMess: null, Carts: action.payload} 
        
        case ActionTypes.CARTS_FAILED:
            return {...state, cartsLoading: false, errMess: action.payload, Carts: null};

        default:
            return state;
    }
}