import * as actionTypes from "./actionTypes"

export const addBrief = (brief: IBrief): void => {
  const action: BriefAction = {
    type: actionTypes.ADD_BRIEF,
    brief,
  }
}
