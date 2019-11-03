import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../actions";
import {
    PageWrapper,
    Page,
    PhotosPageWrapper,
    PhotoCollage
} from "../style/theme";

const Photos = ({ hero }) => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos);

    useEffect(() => {
        dispatch(getPhotos());
    }, []);

    return (
        <React.Fragment>
            {hero}
            <PageWrapper>
                <Page>
                    <h1>Photos</h1>
                    <PhotosPageWrapper>
                        <PhotoCollage>
                            {photos &&
                                photos.map(photo => (
                                    <a
                                        href={`/photo/${photo.id}`}
                                        key={photo.id}
                                    >
                                        <img src={photo.url} />
                                    </a>
                                ))}
                        </PhotoCollage>
                    </PhotosPageWrapper>
                </Page>
            </PageWrapper>
        </React.Fragment>
    );
};

export default Photos;
