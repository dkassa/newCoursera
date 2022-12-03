import * as ActionTypes from './ActionTypes';

export const Leaders = (state  = { isLoading: true,
                                    errMess: null,
                                    leaders:[], leaderFeatured: []}, action) => {
    switch (action.type) {
        
        case ActionTypes.ADD_LEADERS:
            const leaders=action.payload;
        return {...state, isLoading: false, errMess: null, leaders: leaders, leaderFeatured: leaders.filter((leader)=>leader.Featured)};

        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}

        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};