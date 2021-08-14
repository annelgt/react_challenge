import React, {Component} from "react";
import {connect} from "react-redux";
import * as actionTypes from "../store/actionTypes";
import {getBriefs, getProducts} from "../store/actions";
import {getProductBriefs} from "../selectors";
import {
    Box, CircularProgress,
    MenuItem,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";

type BriefListProps = {
    getBriefs: () => void
    getProducts: () => void
    briefs: IBrief[]
    products: IProduct[]
    updateProductFilter: (productId: string) => void
    loadingBriefs?: boolean
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
                <div style={{display: this.props.briefs.length === 0 && !this.state.productId ? "none" : "block"}}>
                    <TextField
                        select
                        disabled={this.props.loadingBriefs === true}
                        name="productId" value={this.state.productId || ""} onChange={this.onChangeProduct}
                        helperText="Filtrer sur le produit"
                    >
                        <MenuItem value="">-----------</MenuItem>
                        {this.props.products.map((product: IProduct) => {
                            return <MenuItem key={product.id} value={product.id}>{product.label}</MenuItem>;
                        })}
                    </TextField>
                </div>
                <div style={{display: this.props.briefs.length === 0 ? "block" : "none"}}>
                    <Box mt={2} mb={2}>
                        <Paper>
                            <Box p={2} textAlign="center">
                                <Typography variant="caption">Aucun article.</Typography>
                            </Box>
                        </Paper>
                    </Box>
                </div>
                <div style={{display: this.props.loadingBriefs || this.props.briefs.length === 0 ? "none" : "block"}}>
                    {this.props.briefs.map((brief: IBrief) => {
                        return (
                            <Box mt={2} mb={2} key={brief.id}>
                                <Paper>
                                    <Box p={2}>
                                        <Typography variant="h6">{brief.title}</Typography>
                                        <Typography variant="subtitle1" paragraph>
                                            {brief.comment}
                                        </Typography>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {brief.product ? brief.product.label : ''}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        );
                    })}
                </div>
                <div style={{display: this.props.loadingBriefs ? "block" : "none"}}>
                    <Box m={2} alignItems="center" justifyContent="center" display="flex">
                        <CircularProgress/>
                    </Box>
                </div>
            </div>
        );

    }
}

const mapDispatchToProps = dispatch => ({
    getBriefs: async (): Promise<void> => {
        dispatch({
            type: actionTypes.LOADING,
            loading: {
                briefs: true
            }
        });
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
        products: state.products,
        loadingBriefs: state.loadingBriefs
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefList);