import React, {Component} from "react";
import {connect} from "react-redux";
import * as actionTypes from "../store/actionTypes";
import {getBriefs} from "../store/actions";

type GetBriefsFunction = () => void;

type BriefListProps = {
    getBriefs: GetBriefsFunction
    briefs: IBrief[]
};

export class BriefList extends Component<BriefListProps> {

    async componentDidMount(): Promise<void> {
        this.props.getBriefs();
    }

    render() {
        return (
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
    }
})

const mapStateToProps = (state) => {
    return {
        briefs: state.briefs
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefList);