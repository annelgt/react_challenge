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
    productFilter?: number
    addingNewBrief?: boolean
    loadingBriefs?: boolean
}

type AppAction = {
    type: string
    brief: IBrief
    products: IProduct[]
    briefs: IBrief[]
    productFilter: number
    loading?: {
        newBrief?: boolean,
        briefs?: boolean
    }
}

type DispatchType = (args: AppAction) => AppAction