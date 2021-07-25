interface IBrief {
  id: string
  title: string
  comment: string
  productId: number
}

type BriefState = {
  briefs: IBrief[]
}

type BriefAction = {
  type: string
  brief: IBrief
}

type DispatchType = (args: BriefAction) => BriefAction