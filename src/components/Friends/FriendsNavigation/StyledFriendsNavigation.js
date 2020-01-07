import styled from "styled-components";

export const FriendsHeader = styled.div`
    width: 100%;
    height: 75px;
    padding: 7px 16px;
    display: flex;
    flex-direction: column;
    background-color: #f5f6f7;
    border-bottom: 1px solid #ccc;

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
            color: #666;
            & > svg {
                margin-right: 5px;
            }
        }
        & span:nth-child(2) a {
            display: inline-block;
            border: 1px solid #ccc;
            padding: 3px 7px;
            text-decoration: none;
            color: #666;
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
        color: #4267b2;
        cursor: pointer;
        font-weight: 600;
    }
    & > div:nth-child(2) ul li a:hover {
        color: #666;
    }
    & > div:nth-child(2) div:nth-child(2) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #ccc;
        padding: 1px;
        & > input {
            border: none;
            border-right: 1px solid #ccc;
            padding: 3px 7px;
        }
    }
`;
