interface IProduct {
  id: string
  label: string
}

interface IBrief {
  id?: string
  title: string
  comment: string
  product?: string
}

type BriefState = {
  briefs: IBrief[]
  products: IProduct[]
}

type BriefAction = {
  type: string
  brief: IBrief
  products: IProduct[]
}

type DispatchType = (args: BriefAction) => BriefAction