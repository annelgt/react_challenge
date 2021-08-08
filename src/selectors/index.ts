import {createSelector} from 'reselect'

const getProductFilter = (state) => state.productFilter
const getBriefs = (state) => state.briefs

export const getProductBriefs = createSelector(
    [getProductFilter, getBriefs],
    (productFilter, briefs) => {
        if (productFilter) {
            return briefs.filter(b => b.product?.id === Number(productFilter));
        }
        return briefs;
    }
)