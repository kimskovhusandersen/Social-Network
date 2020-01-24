import React, { useState, useEffect } from "react";

import StyledPhotoCollage from "./StyledPhotoCollage";

const PhotoCollage = props => {
    const [photoHeight, setPhotoHeight] = useState("");
    let photoCollageRef = React.createRef();

    useEffect(() => {
        if (photoCollageRef) {
            setPhotoHeight(photoCollageRef.clientWidth);
        }
    }, [photoHeight]);
    const showImage = id => {
        console.log("hi image", id);
    };
    let photoCollage = null;
    if (props.photos) {
        photoCollage = (
            <StyledPhotoCollage
                ref={ref => (photoCollageRef = ref)}
                height={photoHeight}
                cols={props.cols || 3}
            >
                {props.photos.map(photo => {
                    return (
                        <img
                            src={photo.url}
                            key={photo.id}
                            onClick={id => showImage(photo.id)}
                        />
                    );
                })}
            </StyledPhotoCollage>
        );
    }

    return photoCollage;
};

export default PhotoCollage;
