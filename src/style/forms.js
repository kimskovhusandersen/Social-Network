import styled, { css, createGlobalStyle } from "styled-components";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";
const HEADER_HEIGHT = "43px";

export const FormWrapper = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > input {
        width: 100%;
        line-height: 1.4em;
        min-height: 20px;
        margin-top: 2px;
    }

    & > a,
    > button {
        margin: 3px 0;

        text-decoration: none;
        cursor: pointer;
        line-height: 1.4em;
        padding: 3px 0;
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: ${BORDER};
        background-color: #fefefe;
        font-size: 12px;
        font-weight: 600;
        color: #444;
    }

    & > a:hover,
    button:hover {
        background-color: #eee;
    }
`;
