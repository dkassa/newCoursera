import * as ActionTypes from './ActionTypes';

export const Promotions = (state = {
        isLoading: true,
        errMess: null,
        promotions: [],promotionFeatured: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PROMOS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload,promotionFeatured: action.payload.filter((promotion)=>promotion.featured)};

        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []};

        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, promotions: []};

        default:
            return state;
    }
}