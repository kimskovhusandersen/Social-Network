import React from "react";
import Post from "./Post/Post";
import NewPost from "./NewPost/NewPost";

const PostList = props => {
    let posts = null;
    let newPost = null;
    if (props.threadId) {
        newPost = <NewPost threadId={props.threadId} />;
    }
    if (props.posts && props.posts.length > 0) {
        posts = props.posts.map(post => <Post key={post.id} post={post} />);
    }
    return (
        <div>
            {newPost}
            {posts}
        </div>
    );
};

export default PostList;
