import React from "react";
import PhotoCollage from "./photo-collage";

const Photos = () => {
    return (
        <React.Fragment>
            <h1>Photos</h1>
            <PhotoCollage cols={4} />
        </React.Fragment>
    );
};

export default Photos;
