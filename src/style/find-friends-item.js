import styled from "styled-components";
import { TimelineWrapper } from "./theme";
let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";
//colors
const BLUE = "#385898";

export const FindFriendsItemWrapper = styled(TimelineWrapper)`
    min-height: 0px;
    padding: 10px;
    display: block;
    width: 75%;
    margin-top: ${props => (props.first ? "calc(43px + 10px)" : "0px")};
    margin-bottom: 10px
    background-color: #fff;
    margin-left: 50px;

    align-items: center;
    justify-content: center;
`;

export const StyledFindFriendItem = styled.div`
    /* border: 3px solid green; */
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 75px 1fr 200px;
    column-gap: 10px;
    padding: 10px;
    border-bottom: ${BORDER};

    & > :nth-child(1) {
        display: block;
        height: 100%;
        width: 100%;
        cursor: pointer;
    }

    & > :nth-child(1) img {
        width: 75px;
        height: 75px;
        object-fit: cover;
    }

    & > :nth-child(2) {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    & > :nth-child(2) img {
        border-radius: 50%;
        width: 25px;
        height: 25px;
        object-fit: cover;
        margin-right: 5px;
    }

    & > :nth-child(2) > * {
        display: inline-flex;
        padding: 5px 0;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    & > :nth-child(2) a {
        text-decoration: none;
        cursor: pointer;
    }

    & > :nth-child(2):nth-child(2) a {
        color: #666;
        cursor: pointer;
    }

    & > :nth-child(3) {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    & > :nth-child(3) a {
        border: ${BORDER};
        border-radius: 2px;
        background-color: #fefefe;
        padding: 3px 7px;
        cursor: pointer;
        text-decoration: none;
        color: #222;
        font-weight: 600;
        margin-right: 5px;
    }
`;

export const ProfileName = styled.span`
    color: ${BLUE};
    font-weight: 600;
    font-size: 1.1em;
`;

export const FriendsName = styled.span`
    color: #666;
    font-weight: 600;
`;
