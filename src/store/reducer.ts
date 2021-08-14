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
                briefs: [action.brief].concat(state.briefs),
                addingNewBrief: false
            };
        case actionTypes.GET_BRIEFS:
            return {
                ...state,
                briefs: state.briefs.concat(action.briefs),
                loadingBriefs: false
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
        case actionTypes.LOADING:
            return {
                ...state,
                addingNewBrief: action.loading?.newBrief === true,
                loadingBriefs: action.loading?.briefs === true,
            };
    }
    return state;
}

export default reducer;