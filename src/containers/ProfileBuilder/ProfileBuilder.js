import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import { ProfileWrapper, ProfilePageItem } from "../../style/theme";

import { Clock } from "../../style/icons";
import RelativeTime from "../../components/UI/RelativeTime/RelativeTime";
import PhotoCollage from "../../components/PhotoCollage/PhotoCollage";

import NewPost from "../../containers/Blog/NewPost/NewPost";
import Post from "../../components/Post/Post";

import classes from "./ProfileBuilder.module.css";

class ProfileBuilder extends React.Component {
    componentDidMount() {
        console.log("[ProfileBuilder.js] componentDidMount", this.props);
        this.props.onFetchPosts();
    }
    render() {
        let bioHandler = null;
        let joined = null;
        let photoUploader = null;

        if (this.props.bioHandler) {
            bioHandler = <div>{this.props.bioHandler}</div>;
        }

        if (this.props.profile) {
            joined = (
                <p>
                    <Clock width="16" height="16" />
                    Joined{" "}
                    <RelativeTime timestamp={this.props.profile.createdAt} />
                </p>
            );
        }

        if (this.props.photoUploader && this.props.isPhotoUploaderVisible) {
            photoUploader = (
                <ProfilePageItem>{this.props.photoUploader}</ProfilePageItem>
            );
        }

        let photoCollage = null;
        if (this.props.photos) {
            let photos = [];
            for (let photoArr in this.props.photos) {
                if (this.props.photos[photoArr].length > 0) {
                    this.props.photos[photoArr].map(photo =>
                        photos.push(photo)
                    );
                }
            }
            if (photos.length > 0) {
                photoCollage = <PhotoCollage cols="3" photos={photos} />;
            }
        }

        let posts = null;
        if (this.props.posts && this.props.profile) {
            posts = this.props.posts
                .filter(post => post.profile_id === this.props.profile.id)
                .map(post => {
                    return <Post key={"post" + post.id} post={post} />;
                });
        }

        return (
            <ProfileWrapper>
                <div>
                    <ProfilePageItem>
                        <div className={classes.IntroWrapper}>
                            {bioHandler}
                            {joined}
                        </div>
                    </ProfilePageItem>
                    <ProfilePageItem>
                        <div className={classes.Header}>
                            <span>
                                <a>Photos</a>
                            </span>
                            <span>
                                <a>Add photo</a>
                            </span>
                        </div>
                        {photoCollage}
                    </ProfilePageItem>
                </div>

                <div>
                    {photoUploader}
                    <NewPost />
                    {posts}
                </div>
            </ProfileWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.postReducer.posts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(actions.fetchPosts())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileBuilder);
