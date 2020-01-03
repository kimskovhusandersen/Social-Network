import styled, { css, createGlobalStyle } from "styled-components";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";

const LIGHT_BLUE = "#0084ff";
const DARK_BLUE = "#2851a3";
const LIGHT_GREY = "#eee";
const DARK_GREY = "#333";

export const HeaderWrapper = styled.header`
    transform: translateX(${TRANSLATE_PAGE});
    width: 100%;
    height: 43px;
    flex: none;
    position: fixed;
    top: 0;
    background-color: #2851a3;
    z-index: 1;
    display: flex;
    justify-content: center;
`;

export const Logo = styled.img`
    display: block;
    background-image: url("https://s3.amazonaws.com/coriander-imageboard/ysYB3LtmBepQl9fHDGL8V6KZ9U6CdzVv.jpg");
    background-size: cover;
    width: 33px;
    height: 33px;
    border-radius: 50%;
`;

export const StyledHeader = styled.div`
    width: calc(${PAGE_WIDTH}px + 100px);
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > div {
        position: relative;
        width: 600px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 1px;
        background-color: #fff;
        padding: 3px 0px;

        & > input {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            border: none;
            width: 100%;
            padding: 3px 7px;
        }
        & > span {
            padding: 3px 7px;
            position: absolute;
            top: 30px;
            width: inherit;
            border: ${BORDER};
            z-index: 3;
            /* height: 100%; */
            background: #fefefe;
            & > a {
                display: block;
                width: 100%;
                padding: 3px 7px;
                background: #fff;
                text-decoration: none;
                font-weith: 500;
                color: #111;
                font-size: 0.9em;
            }
            & > a:hover {
                background-color: #eee;
            }
        }
        & > svg {
            border-left: ${BORDER};
        }
        &>input: focus {
            outline: 0;
        }
    }

    & > ul {
        width: 350px;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        list-style-type: none;
        height: 27px;
    }

    & > ul li {
        display: inline-flex;
        border-right: 1px solid #1d3c78;
        height: 27px;

        & > a:nth-child(1) {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            & > img {
                border-radius: 50%;
                margin-right: 5px;
                height: 25px;
                width: 25px;
                object-fit: cover;
            }
        }

        & > a {
            display: inline-flex;
            align-items: center;
            text-align: center;
            text-decoration: none;
            font-weight: 500;
            color: white;
            cursor: pointer;
            font-size: 14px;
            line-height: 15px;
            border-radius: 5%;
            padding: 3px 7px;
        }
        & > a:hover {
            background-color: #1d3c78;
        }
    }
`;
