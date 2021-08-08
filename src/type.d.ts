interface IProduct {
    id: number
    label: string
}

interface IBrief {
    id: number
    title: string
    comment: string
    product?: IProduct
}

type BriefState = { title: string, comment: string, productId: number }


type AppState = {
    briefs: IBrief[]
    products: IProduct[]
}

type AppAction = {
    type: string
    brief: IBrief
    products: IProduct[]
    briefs: IBrief[]
}

type DispatchType = (args: AppAction) => AppAction