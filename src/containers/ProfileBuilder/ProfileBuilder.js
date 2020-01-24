import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import RelativeTime from "../../components/UI/RelativeTime/RelativeTime";
import PhotoCollage from "../../components/PhotoCollage/PhotoCollage";
import PostList from "../../components/PostList/PostList";
import { ProfileWrapper, ProfilePageItem } from "../../style/theme";
import { Clock } from "../../style/icons";
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
        let newPost = null;

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

        let postList = null;
        if (this.props.posts && this.props.profile) {
            let posts = this.props.posts.filter(
                post => post.profileId === this.props.profile.id
            );
            postList = (
                <PostList
                    posts={this.props.posts}
                    threadId={`profile_${this.props.profile.id}`}
                />
            );
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
                    {postList}
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
