import styled from "styled-components";
let PAGE_WIDTH = 900;
/* POSITIONING */
export const ShowPhotoWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    z-index: 100;
`;
export const ShowPhoto = styled.div`
    position: absolute;
    background: ghostwhite;
    top: calc(50%);
    left: 50%;
    transform: translate(-50%, -50%);
    right: 0;
    width: calc(100vw - 40px);
    height: calc(100vh - 40px);
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 300px;
`;

export const PhotoWrapper = styled.div`
    position: relative;
    border: 3px solid red;
    background-color: #000;

    & > a:nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
    }
    & > img {
        position: absolute;
        height: 100%;
        max-width: 100%;
        object-fit: cover;
        left: 50%;
        transform: translateX(-50%);
    }

    & > a:nth-child(3) {
        position: absolute;
        top: 0;
        right: 0;
        color: white;
    }
`;

export const PhotoIcons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 95%;
    padding: 10px 0;

    & > img {
        height: 20px;
        min-height: 20px;
        width: 20px;
        min-width: 20px;
    }
`;
export const PhotoInfo = styled.div``;
export const CommentsWrapper = styled.div``;
export const CommentsHeader = styled.div`
    padding: 5px;

    & > img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
    }
`;
export const Comments = styled.div``;
export const Comment = styled.div`
    width: 100%;
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin-top: 5px;
`;
