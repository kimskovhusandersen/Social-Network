import styled, { css, createGlobalStyle } from "styled-components";
import { PageItem } from "./theme";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";
const COLS = 4;

export const StyledPhotoCollage = styled(PageItem)`
    display: grid;
    grid-template-columns: ${props =>
        props.cols
            ? `repeat(${props.cols}, calc(100% / ${props.cols} - 5px))`
            : `repeat(${COLS}, calc(100% / ${COLS} - 5px))`};
    grid-template-rows: auto;
    justify-content: space-evenly;
    grid-gap: 5px;

    & > a {
        cursor: pointer;
        width: calc(100%);
    }

    & > a img {
        width: 100%;
        height: ${props =>
        props.height ? `${props.height / props.cols}px` : `${100 / COLS}%`};
        object-fit: cover;
    }
`;
