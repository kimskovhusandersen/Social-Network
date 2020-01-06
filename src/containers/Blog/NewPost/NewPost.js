import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../../store/actions";

import PostForm from "./PostForm/PostForm";

import classes from "./NewPost.module.css";

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        };
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    postDataHandler() {
        const data = {
            body: this.state.content
        };
        this.props.onCreatePost(data);
    }

    render() {
        let newPost = null;
        if (this.props.profile) {
            newPost = (
                <div className={classes.NewPost}>
                    <h1 className={classes.PostHeader}>Create post</h1>
                    <div className={classes.PostBody}>
                        <PostForm />
                    </div>
                </div>
            );
        }
        return newPost;
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profileReducer.profile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreatePost: post => dispatch(actions.createPost(post))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPost);
