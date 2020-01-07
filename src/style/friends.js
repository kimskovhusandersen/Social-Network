import styled from "styled-components";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";

const LIGHT_BLUE = "#0084ff";
const DARK_BLUE = "#2851a3";
const LIGHT_GREY = "#eee";
const DARK_GREY = "#333";

export const FriendsWrapper = styled.div`
    min-height: 0px;
    width: 100%;
    height: 100%;
    border: ${BORDER};
`;

export const FriendsItemWrapper = styled.div`
    width: 100%;
    padding: 10px;
    min-height: 0px;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 5px));
    grid-gap: 10px;
    background-color: #fff;
`;

export const StyledFriendsItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border: ${BORDER};
    font-size: 15px;
    background-color: #fff;

    & > img {
        width: 75px;
        height: 75px;
        margin-right: 5px;
    }
    & > div:nth-child(2) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        & > div:nth-child(1) {
            margin-left: 5px;

            display: inline-flex;
            flex-direction: column;
            font-size: 0.9em;
            & > span:nth-child(1) {
                color: ${DARK_BLUE};
                font-weight: 600;
                font-size: 1.1em;
            }
            & > span:nth-child(2) {
                color: #aaa;
            }
        }
        & > div:nth-child(2) {
            margin-right: 5px;

            & > a {
                border: ${BORDER};
                font-size: 12px;
                padding: 7px 16px;
                cursor: pointer;
            }
            & > a:hover {
                background-color: ${LIGHT_GREY};
            }
        }
    }
`;
