import styled, { css, createGlobalStyle } from "styled-components";
const BORDER = "1px solid #ccc";

export const AboutMeWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    & > p,
    > div p {
        font-size: 0.9em;
        padding: 10px 0;
        display: inline-flex;
        align-items: center;
        & > svg {
            margin-right: 5px;
        }
    }
`;

export const AboutMeHeader = styled.div`
    padding-bottom: 10px;

    & > svg {
        margin-right: 5px;
    }
    & > span {
        font-weight: 400;
        text-decoration: none;
        cursor: pointer;
        color: #111;
        display: inline-block;
    }
`;

export const AboutMeBody = styled.div`
    align-self: center;
    text-align: center;
    line-height: 1.4em;
    width: 100%;

    & > span a,
    * > form button {
        cursor: pointer;
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

    & > span a:hover {
        background-color: #efefef;
    }

    & > span a svg {
        margin-left: 3px;
    }
`;
