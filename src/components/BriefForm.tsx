import React, {Component} from "react";
import {connect} from "react-redux";
import * as actionTypes from "../store/actionTypes";
import {getProducts} from "../store/actions";

type GetProductsFunction = () => void;

type BriefFormProps = {
    getProducts: GetProductsFunction,
    products: IProduct[]
};

export class BriefForm extends Component<BriefFormProps, IBrief> {
    constructor(props) {
        super(props);
        this.state = {title: "", comment: "", product: ""};

        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
    }

    async componentDidMount(): Promise<void> {
        this.props.getProducts();
    }

    onChangeProduct(event): void {
        this.setState({product: event.target.value});
    }

    onChangeTitle(event): void {
        this.setState({title: event.target.value});
    }

    onChangeComment(event): void {
        this.setState({comment: event.target.value});
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
                <select name="product" value={this.state.product} onChange={this.onChangeProduct}>

                    {this.props.products.map((product: IProduct, index) => {

                        return <option key={product.id} value={product.id}>{product.label}</option>;

                    })}

                </select>
                <input type="submit" value="Valider"/>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getProducts: async () => {
        const products = await getProducts();
        dispatch({
            type: actionTypes.GET_PRODUCTS,
            products: products
        });
    }
})

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefForm);