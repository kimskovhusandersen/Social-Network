import styled from "styled-components";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";
const LIGHT_BLUE = "#0084ff";
const LIGHT_GREY = "#eee";

export const MessagesWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 50px - 50px - 43px);
    overflow-y: scroll;
    padding: 7px 16px;
`;

export const StyledTextArea = styled.input`
    width: 100%;
    height: 50px;
    padding: 16px 7px;
`;

export const StyledMessageItem = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 550px;
    width: 50%;
    padding: 0 10px;
    border-right: ${BORDER};

    font-size: 15px;
    align-items: ${props =>
        props.senderId != props.profileId ? "flex-start" : "flex-end"};

    text-align: ${props =>
        props.senderId != props.profileId ? "left" : "right"};

    & > span:nth-child(1),
    > span:nth-child(3) {
        color: #aaa;
        font-size: 12px;
        padding: 3px 7px;
    }
    & > span:nth-child(2) {
        border-radius: 9px;
        max-width: 75%;
        padding: 9px 16px;
        text-align: left;
        background: ${props =>
        props.senderId != props.profileId
            ? `${LIGHT_GREY}`
            : `${LIGHT_BLUE}`};
        color: ${props =>
        props.senderId != props.profileId ? "#111" : "#fff"};
        display: block;
    }
`;
