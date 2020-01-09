import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import PhotoCollage from "../../components/PhotoCollage/PhotoCollage.js";

import classes from "./PhotoBuilder.module.css";

class PhotoBuilder extends Component {
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
        let photos = null;
        if (this.props.photos) {
            photos = <PhotoCollage cols={4} />;
        }
        return (
            <div className={classes.PhotoBuilder}>
                <div className={classes.PhotoHeader}>
                    <h1>Photos</h1>
                </div>
                <div className={classes.PhotoBody}>{photos}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        photos: state.photoReducer.photos
    };
};

export default connect(mapStateToProps)(PhotoBuilder);
