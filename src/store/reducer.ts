import * as actionTypes from "./actionTypes"
import {v4 as uuidv4} from 'uuid';

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
            const newBrief: any = {
                id: uuidv4(),
                title: action.brief.title,
                comment: action.brief.comment,
                product: action.brief.product,
            }
            return {
                ...state,
                briefs: state.briefs.concat(newBrief),
            }
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
    }
    return state
}

export default reducer