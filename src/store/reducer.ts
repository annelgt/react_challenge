import * as actionTypes from "./actionTypes"
import { v4 as uuidv4 } from 'uuid';

const initialState: BriefState = {
  briefs: [],
}

const reducer = (
  state: BriefState = initialState,
  action: BriefAction
): BriefState => {
  switch (action.type) {
    case actionTypes.ADD_BRIEF:
      const newBrief: IBrief = {
        id: uuidv4(),
        title: action.brief.title,
        comment: action.brief.comment,
        productId: action.brief.productId,
      }
      return {
        ...state,
        briefs: state.briefs.concat(newBrief),
      }
  }
  return state
}

export default reducer