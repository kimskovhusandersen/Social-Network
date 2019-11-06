import styled, { css, createGlobalStyle } from "styled-components";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";
const HEADER_HEIGHT = "43px";

export const ProfilePageWrapper = styled.div`
    justify-content: center;
    transform: translateX(${TRANSLATE_PAGE});
    flex: auto;
    display: flex;
    margin-bottom: 10px;
    margin-top: ${props => (props.first ? "43px" : "0px")};

    /* background-color: #929292; */
`;

export const ProfileInnerPage = styled.div`
    min-height: 100vh;
    margin-top: 2px;
    width: ${PAGE_WIDTH}px;
    /* border: 3px solid green; */
`;

export const ChatPageWrapper = styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    width: 100vw;
    position: absolute;
    top: ${HEADER_HEIGHT};
`;
