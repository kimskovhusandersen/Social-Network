import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StyledPhotoCollage from "./StyledPhotoCollage";

const PhotoCollage = props => {
    const [photoHeight, setPhotoHeight] = useState("");
    let photoCollageRef = React.createRef();

    useEffect(() => {
        if (photoCollageRef) {
            setPhotoHeight(photoCollageRef.clientWidth);
        }
    }, [photoHeight]);

    let photoCollage = null;
    if (props.photos) {
        photoCollage = (
            <StyledPhotoCollage
                ref={ref => (photoCollageRef = ref)}
                height={photoHeight}
                cols={props.cols || 3}
            >
                {props.photos.map(photo => (
                    <a href={`/photo/${photo.id}`} key={photo.id}>
                        <img src={photo.url} />
                    </a>
                ))}
            </StyledPhotoCollage>
        );
    }

    return photoCollage;
};

const mapStateToProps = state => {
    return {
        photos: state.photoReducer.photos
    };
};

export default connect(mapStateToProps)(PhotoCollage);
