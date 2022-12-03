import * as ActionTypes from './ActionTypes';

export const CCarts = (state = {
        
        CCarts: []
        
    
    }, action) => {
    switch(action.type) {

        
        case ActionTypes.ADD_CARTSS:
            return {...state, CCarts: JSON.parse(localStorage.getItem('carte'))} 
        
        

        default:
            return state;
    }
}