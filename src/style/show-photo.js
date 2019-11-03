import styled from "styled-components";
let PAGE_WIDTH = 900;
const BORDER = "1px solid #ccc";
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

export const Close = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    cursor: pointer;
    z-index: 5;
`;

export const ShowPhoto = styled.div`
    position: absolute;
    background: ghostwhite;
    top: calc(50%);
    left: 50%;
    transform: translate(-50%, -50%);
    right: 0;
    width: calc(100vw - 60px);
    height: calc(100vh - 40px);
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 300px;
`;

export const PhotoWrapper = styled.div`
    position: relative;
    background-color: #000;

    & > span:nth-child(1) {
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        width: 50%;
    }
    & > img {
        position: absolute;
        height: 100%;
        max-width: 100%;
        object-fit: cover;
        left: 50%;
        transform: translateX(-50%);
    }

    & > span:nth-child(3) {
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        color: white;
        z-index: 3;
        text-align: right;
    }

    & > span a {
        display: block;
        height: inherit;
        width: 100%;
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
    margin-top: 10px;
    padding: 0 5px;
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-column-gap: 5px;
    width: 100%;
    height: 50px
    align-items: center;
    justify-content: center;

    & > img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
    }

    & > div span a {
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        color: #1d3c78;
        display: inline-block;
    }
    & > div span:nth-child(2) {
        font-size: 12px;
        color: #444;
        display: block;
    }

    & > ul {
        padding: 2px 0;
        list-style-type: none;
    }
    & > ul li {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 33%;
    }

    & > ul li a {
        padding: 3px 7px;
        font-size: 12px;
        font-weight: 600;
        color: #444;
        width: 100%;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & > ul li a:hover {
        background-color: #efefef;
    }
`;

export const WriteComment = styled.div`
    padding: 5px;
    background-color: #efefef;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: ${BORDER};

    & > img {
        width: 35px;
        height: 35px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 5px;
    }
    & > input {
        width: calc(100% - 30px);
        padding: 7px 16px;
        line-height: 15px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 10px;
    }
`;

export const LikeCommentShare = styled(CommentsHeader)`
    grid-template-columns: 1fr;
    margin: 0;
`;

export const Caption = styled(LikeCommentShare)`
    min-height: 100px;
    border-bottom: ${BORDER};
    width: 90%;
    margin-left: 5%;
`;

export const Comments = styled(CommentsHeader)``;

export const Comment = styled.div`
    width: 100%;
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin-top: 5px;
`;
