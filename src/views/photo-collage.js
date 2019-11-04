import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../actions";
import { StyledPhotoCollage } from "../style/photo-collage";

const PhotoCollage = ({ cols }) => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos);
    const [photoHeight, setPhotoHeight] = useState("");
    let photoCollage = React.createRef();

    useEffect(() => {
        dispatch(getPhotos());
        if (photoCollage) {
            setPhotoHeight(photoCollage.clientWidth);
        }
        console.log(photoHeight);
    }, [photoHeight]);

    return (
        <React.Fragment>
            <StyledPhotoCollage
                ref={ref => (photoCollage = ref)}
                height={photoHeight}
                cols={cols}
            >
                {photos &&
                    photos.map(photo => (
                        <a href={`/photo/${photo.id}`} key={photo.id}>
                            <img src={photo.url} />
                        </a>
                    ))}
            </StyledPhotoCollage>
        </React.Fragment>
    );
};

export default PhotoCollage;
