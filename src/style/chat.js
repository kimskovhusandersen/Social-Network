import styled, { css, createGlobalStyle } from "styled-components";
import { Field } from "formik";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";
const ROWS = 10;
//colors
const BLUE = "#385898";

export const StyledChat = styled.div`
    width: 100%;
    height: inherit;
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 50px auto;
    grid-template-areas:
        "threadsHeader messagesHeader"
        "threadsWrapper messagesWrapper";
    background-color: #fff;
    overflow: hidden;
`;

export const ThreadsHeader = styled.div`
    grid-area: threadsHeader;
    height: 50px;
    display: flex;
    flex-direction: columns;
    justify-content: space-between;
    padding: 0px 16px;
    align-items: center;
    border-bottom: ${BORDER};

    & > span {
        font-weight: 600;
        font-size: 24px;
    }
    & > a {
        display: block;
        padding: 3px 7px;
        background: #fefefe;
        cursor: pointer;
        border-radius: 2px;
    }
    & > a:hover {
        background: #eee;
    }
`;

export const MessagesHeader = styled(ThreadsHeader)`
    grid-area: messagesHeader;
    border: ${BORDER};

    & > div {
        display: flex;
        flex-direction: rows;
        align-items: center;
        width: 100%;
        height: 65px;
    }

    & > div img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #fff;
        object-fit: fit;
    }

    & > div span {
        font-weight: 600;
        font-size: 16px;
        display: block;
        height: 50%;
        widht: 100%;
        margin-left: 5px;
    }
`;

export const ThreadsWrapper = styled.div`
    grid-area: threadsWrapper;
    height: calc(100% - 50px);
    width: 100%;
    padding: 0 20px;
    overflow-y: scroll;
`;

export const MessagesWrapper = styled.div`
    grid-area: messagesWrapper;
    height: calc(100% - 50px);
    border: ${BORDER};
`;

export const StyledChatThreadItem = styled.div`
    display: flex;
    flex-direction: rows;
    align-items: center;
    width: 100%;
    height: 65px;
    border-bottom: ${BORDER};
    cursor: pointer;

    & > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #fff;
        object-fit: fit;
    }
    & > div {
        display: inline-flex;
        flex-direction: column;
        max-width: calc(100% - 55px);
        margin-left: 5px;
    }
    & > div span {
        display: block;
        height: 50%;
        widht: 100%;
    }
`;
