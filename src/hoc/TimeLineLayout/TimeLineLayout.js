import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import NewPost from "../../containers/Blog/NewPost/NewPost";
import Post from "../../components/Post/Post";

import classes from "./TimeLineLayout.module.css";

class TimelineLayout extends Component {
    componentDidMount() {
        this.props.onFetchPosts();
    }
    render() {
        let posts = null;
        if (this.props.posts) {
            posts = this.props.posts.map(post => {
                return <Post key={"post" + post.id} post={post} />;
            });
        }
        return (
            <main className={classes.MainContainer}>
                <div className={classes.SideNavigation}>Side Navigation</div>
                <div className={classes.Stream}>
                    <NewPost />
                    {posts}
                </div>
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
