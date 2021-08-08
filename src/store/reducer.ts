import * as actionTypes from "./actionTypes"


const initialState: AppState = {
    briefs: [],
    products: [],
}

const reducer = (
    state: AppState = initialState,
    action: AppAction
): AppState => {

    switch (action.type) {
        case actionTypes.ADD_BRIEF:
            return {
                ...state,
                briefs: state.briefs.concat(action.brief)
            };
        case actionTypes.GET_BRIEFS:
            return {
                ...state,
                briefs: state.briefs.concat(action.briefs)
            };
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: action.products
            };
        case actionTypes.SET_PRODUCT_FILTER:
            return {
                ...state,
                productFilter: action.productFilter
            };
    }
    return state;
}

export default reducer;