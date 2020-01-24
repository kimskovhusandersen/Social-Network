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

    render() {
        let newPost = null;
        if (this.props.profile && this.props.threadId) {
            newPost = (
                <div className={classes.NewPost}>
                    <h1 className={classes.PostHeader}>Create post</h1>
                    <div className={classes.PostBody}>
                        <PostForm threadId={this.props.threadId} />
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

export default connect(mapStateToProps)(NewPost);
