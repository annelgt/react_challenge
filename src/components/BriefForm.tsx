import React, {Component} from "react";
import {connect} from "react-redux";
import * as actionTypes from "../store/actionTypes";
import {createBrief, getProducts} from "../store/actions";

type GetProductsFunction = () => void;
type CreateBriefFunction = (data: BriefState) => void;

type BriefFormProps = {
    getProducts: GetProductsFunction,
    createBrief: CreateBriefFunction,
    products: IProduct[]
};

export class BriefForm extends Component<BriefFormProps, BriefState> {
    constructor(props) {
        super(props);
        this.state = {title: "", comment: "", productId: 1};

        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.createBrief = this.createBrief.bind(this);
    }

    async componentDidMount(): Promise<void> {
        this.props.getProducts();
    }

    onChangeProduct(event): void {
        this.setState({productId: event.target.value});
    }

    onChangeTitle(event): void {
        this.setState({title: event.target.value});
    }

    onChangeComment(event): void {
        this.setState({comment: event.target.value});
    }

    createBrief(event): void {
        event.preventDefault();
        this.props.createBrief(this.state);
    }

    render() {
        return (
            <form>
                <label>
                    Titre :
                </label>
                <input type="text" name="title" value={this.state.title} onChange={this.onChangeTitle}/>

                <label>
                    Commentaire :
                </label>
                <input type="text" name="comment" value={this.state.comment} onChange={this.onChangeComment}/>
                <select name="product" value={this.state.productId || this.props.products[0]?.id}
                        onChange={this.onChangeProduct}>
                    {this.props.products.map((product: IProduct, index) => {
                        return <option key={product.id} value={product.id}>{product.label}</option>;
                    })}
                </select>
                <input type="submit" onClick={this.createBrief} value="Valider"/>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getProducts: async (): Promise<void> => {
        const products = await getProducts();
        dispatch({
            type: actionTypes.GET_PRODUCTS,
            products: products
        });
    },
    createBrief: async (brief: BriefState): Promise<void> => {
        const newBrief = await createBrief(brief);
        dispatch({
            type: actionTypes.ADD_BRIEF,
            brief: newBrief
        });
    }
})

const mapStateToProps = (state) => {
    return {
        products: state.products
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefForm);