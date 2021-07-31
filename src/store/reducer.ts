import * as actionTypes from "./actionTypes"


const initialState: BriefState = {
    briefs: [],
    products: [],
}

const reducer = (
    state: BriefState = initialState,
    action: BriefAction
): BriefState => {

    switch (action.type) {
        case actionTypes.ADD_BRIEF:
            return {
                ...state,
                briefs: state.briefs.concat(action.brief)
            };
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: action.products
            };
    }
    return state;
}

export default reducer;