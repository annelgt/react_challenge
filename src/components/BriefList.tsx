import React, {Component} from "react";
import {connect} from "react-redux";
import * as actionTypes from "../store/actionTypes";
import {getBriefs, getProducts} from "../store/actions";
import {getProductBriefs} from "../selectors";

type BriefListProps = {
    getBriefs: () => void
    getProducts: () => void
    briefs: IBrief[]
    products: IProduct[]
    updateProductFilter: (productId: string) => void
};

type BriefListState = { productId?: number }

export class BriefList extends Component<BriefListProps, BriefListState> {
    constructor(props) {
        super(props);
        this.state = {};

        this.onChangeProduct = this.onChangeProduct.bind(this);
    }

    async componentDidMount(): Promise<void> {
        this.props.getBriefs();
        this.props.getProducts();
    }

    onChangeProduct(event): void {
        this.setState({productId: event.target.value});
        this.props.updateProductFilter(event.target.value);
    }

    render() {
        return (
            <div>
                <select name="productId" value={this.state.productId || ""} onChange={this.onChangeProduct}>
                    <option value="">-----------</option>
                    {this.props.products.map((product: IProduct) => {
                        return <option key={product.id} value={product.id}>{product.label}</option>;
                    })}
                </select>
                <ul>
                    {this.props.briefs.map((brief: IBrief) => {
                        return (
                            <li key={brief.id}>
                                {brief.title}
                                <ul>
                                    <li>
                                        {brief.comment}
                                    </li>
                                    <li>
                                        {brief.product?.label}
                                    </li>
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getBriefs: async (): Promise<void> => {
        const briefs = await getBriefs();
        dispatch({
            type: actionTypes.GET_BRIEFS,
            briefs: briefs
        });
    },
    getProducts: async (): Promise<void> => {
        const products = await getProducts();
        dispatch({
            type: actionTypes.GET_PRODUCTS,
            products: products
        });
    },
    updateProductFilter: (productId): void => {
        dispatch({
            type: actionTypes.SET_PRODUCT_FILTER,
            productFilter: productId
        });
    }
})

const mapStateToProps = (state) => {
    return {
        briefs: getProductBriefs(state),
        products: state.products
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefList);