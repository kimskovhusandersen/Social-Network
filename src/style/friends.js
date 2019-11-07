import styled from "styled-components";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";
const LIGHT_BLUE = "#0084ff";
const DARK_BLUE = "#2851a3";
const LIGHT_GREY = "#eee";
const DARK_GREY = "#333";

export const FriendsWrapper = styled.div`
    width: 100%;
    height: 100%;
    border: ${BORDER};
`;
export const FriendsHeader = styled.div`
    width: 100%;
    height: 75px;
    padding: 7px 16px;
    display: flex;
    flex-direction: column;
    background-color: #fefefe;
    border-bottom: ${BORDER};

    & > * {
        height: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    & > div:nth-child(1) {
        & > span:nth-child(1) {
            line-height: 1.1em;
            font-weight: 600;
            font-size: 21px;
            color: ${DARK_GREY};
            & > svg {
                margin-right: 5px;
            }
        }
        & span:nth-child(2) a {
            display: inline-block;
            border: ${BORDER};
            padding: 3px 7px;
            text-decoration: none;
            color: ${DARK_GREY};
            cursor: pointer;
            border-radius: 3px;
        }
        & span:nth-child(2) a:hover {
            background-color: #eee;
        }
    }

    & > div:nth-child(1),
    > div:nth-child(2) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    & > div:nth-child(2) ul {
        list-style-type: none;
    }
    & > div:nth-child(2) ul li {
        display: inline-block;
        padding: 3px 7px;
    }
    & > div:nth-child(2) ul li a {
        display: block;
        color: ${DARK_BLUE};
        cursor: pointer;
        font-weight: 600;
    }
    & > div:nth-child(2) ul li a:hover {
        color: ${DARK_GREY};
    }
    & > div:nth-child(2) div:nth-child(2) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border: ${BORDER};
        padding: 1px;
        & > input {
            border: none;
            border-right: ${BORDER};
            padding: 3px 7px;
        }
    }
`;

export const FriendsItemWrapper = styled.div`
    width: 100%;
    padding: 10px;

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
