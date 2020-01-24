import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import PostList from "../../components/PostList/PostList";

import classes from "./TimeLineLayout.module.css";

class TimelineLayout extends Component {
    componentDidMount() {
        this.props.onFetchPosts();
    }
    render() {
        let postList = null;
        if (this.props.posts) {
            postList = (
                <PostList posts={this.props.posts} threadId={"timeline"} />
            );
        }
        return (
            <main className={classes.MainContainer}>
                <div className={classes.SideNavigation}>Side Navigation</div>
                <div className={classes.Stream}>{postList}</div>
                <div className={classes.RightColumn}>Right Columns</div>
            </main>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(actions.fetchPosts())
    };
};

const mapStateToProps = state => {
    return {
        posts: state.postReducer.posts
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimelineLayout);
