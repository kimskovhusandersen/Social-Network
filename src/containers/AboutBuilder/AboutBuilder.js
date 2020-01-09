import React, { Component, Fragment } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import * as actions from "../../store/actions";

import FriendsItem from "../../components/Friends/FriendsItem/FriendsItem.js";

import FriendsNavigation from "../../components/Friends/FriendsNavigation/FriendsNavigation.js";
// Style
import { FriendsItemWrapper, FriendsWrapper } from "../../style/friends";

import classes from "./AboutBuilder.module.css";

class AboutBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    handleSearch(result) {
        this.setFriendsBySearch(result);
    }

    setFriendsBySearch(result) {
        console.log(result);
    }

    render() {
        let about = null;
        let leftNavigation = null;

        leftNavigation = [
            "Overview",
            "Work and education",
            "Places you've lived",
            "Contact and basic info",
            "Family and relationships",
            "Details about you",
            "Life events"
        ].map((item, i) => {
            return <a key={i}>{item}</a>;
        });

        if (this.props.profile) {
            console.log(this.props.profile);
        }

        return (
            <div className={classes.AboutBuilder}>
                <div className={classes.AboutHeader}>
                    <h1>About</h1>
                </div>
                <div className={classes.AboutBody}>
                    <nav className={classes.leftNavigation}>
                        {leftNavigation}
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        friends: state.friendReducer.friends
    };
};

export default connect(mapStateToProps)(AboutBuilder);
