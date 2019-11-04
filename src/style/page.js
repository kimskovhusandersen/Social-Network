import styled, { css, createGlobalStyle } from "styled-components";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";

export const PageWrapper = styled.div`
    justify-content: center;
    transform: translateX(${TRANSLATE_PAGE});
    flex: auto;
    display: flex;
    margin-bottom: 10px;
    /* background-color: #929292; */
`;

export const InnerPage = styled.div`
    min-height: 100vh;
    margin-top: 2px;
    width: ${PAGE_WIDTH}px;
    /* border: 3px solid green; */
`;
