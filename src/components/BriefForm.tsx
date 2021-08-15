import React, {Component} from "react";
import {connect} from "react-redux";
import * as actionTypes from "../store/actionTypes";
import {createBrief, getProducts} from "../store/actions";
import {Box, Button, CircularProgress, MenuItem, TextField} from "@material-ui/core";

type GetProductsFunction = () => void;
type CreateBriefFunction = (data: BriefState) => void;

type BriefFormProps = {
    getProducts: GetProductsFunction,
    createBrief: CreateBriefFunction,
    products: IProduct[]
    addingNewBrief?: boolean
};

type BriefFormState = {
    title: string,
    comment: string,
    productId: number,
    errors?: {
        title?: string,
        comment?: string,
        product?: string
    }
}

export class BriefForm extends Component<BriefFormProps, BriefFormState> {
    constructor(props) {
        super(props);
        this.state = {title: "", comment: "", productId: 0};

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

        if (event.target.value) {
            this.setState({
                errors: {
                    title: this.state.errors?.title,
                    comment: this.state.errors?.comment,
                    product: undefined
                }
            });
        }
    }

    onChangeTitle(event): void {
        this.setState({title: event.target.value, errors: undefined});
    }

    onChangeComment(event): void {
        this.setState({comment: event.target.value, errors: undefined});
    }

    createBrief(event): void {
        event.preventDefault();
        if (this.state.title && this.state.comment) {
            this.props.createBrief({
                title: this.state.title,
                comment: this.state.comment,
                productId: this.state.productId,
            });
            this.setState({title: "", comment: "", productId: 0, errors: undefined});
        } else {
            const errors = {
                title: "",
                comment: "",
                product: ""
            };
            if (!this.state.title) {
                errors.title = "Ce champ est obligatoire."
            }

            if (!this.state.comment) {
                errors.comment = "Ce champ est obligatoire."
            }

            if (!Number(this.state.productId)) {
                errors.product = "Ce champ est obligatoire."
            }

            this.setState({errors: errors});
        }
    }

    render() {
        return (
            <form>
                <Box m={2}>
                    <TextField required
                               error={!!this.state.errors?.title}
                               helperText={this.state.errors?.title || ""}
                               type="text"
                               name="title"
                               label="Titre"
                               value={this.state.title}
                               onChange={this.onChangeTitle}/>
                </Box>
                <Box m={2}>
                    <TextField required
                               error={!!this.state.errors?.comment}
                               helperText={this.state.errors?.comment || ""}
                               type="text"
                               name="comment"
                               label="Commentaire"
                               value={this.state.comment}
                               onChange={this.onChangeComment}/>
                </Box>
                <Box m={2} data-container="select-product">
                    <TextField
                        select
                        error={!!this.state.errors?.product}
                        required
                        name="product" value={this.state.productId}
                        onChange={this.onChangeProduct}
                        helperText={this.state.errors?.product || "Sélectionnez un produit"}
                    >
                        <MenuItem value="0">----------</MenuItem>
                        {this.props.products.map((product: IProduct, index) => {
                            return <MenuItem key={product.id} value={product.id}>{product.label}</MenuItem>;
                        })}
                    </TextField>
                </Box>
                <Box m={2} display="flex">
                    <Box>
                        <Button type="submit"
                                variant="contained"
                                color="primary"
                                onClick={this.createBrief}>
                            Ajouter
                        </Button>
                    </Box>
                    <Box ml={2} mt={1}>
                        {this.props.addingNewBrief ? <CircularProgress size={20}/> : ""}
                    </Box>
                </Box>
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
        dispatch({
            type: actionTypes.LOADING,
            loading: {
                newBrief: true
            }
        });
        const newBrief = await createBrief(brief);
        dispatch({
            type: actionTypes.ADD_BRIEF,
            brief: newBrief
        });
    }
})

const mapStateToProps = (state) => {
    return {
        products: state.products,
        addingNewBrief: state.addingNewBrief,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefForm);