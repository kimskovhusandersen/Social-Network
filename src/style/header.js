import styled, { css, createGlobalStyle } from "styled-components";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";

export const StyledHeader = styled.header`
    width: 100%;
    flex: none;
    position: fixed;
    top: 0;
    background-color: #2851a3;
    z-index: 12;
    height: 43px;
    overflow: hidden;
    text-align: center;

    & > * {
        height: inherit;
    }
`;

export const InnerHeader = styled.div`
    display: inline-grid;
    transform: translateX(-3%);
    grid-template-columns: 43px 400px 1fr;
    height: 43px;
    width: 85%;

    & > form {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & > form > * {
        height: 23px;
        font-size: 14px;
    }

    & > form input {
        width: 90%;
        padding: 3px 6px;
    }

    & > form button {
        width: 10%;
        cursor: pointer;
    }
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
        max-height: 27px;
        max-width: 27px;
        object-fit: fit;
    }
`;

export const Logo = styled.img`
    background-image: url("https://s3.amazonaws.com/coriander-imageboard/ysYB3LtmBepQl9fHDGL8V6KZ9U6CdzVv.jpg");
    background-size: cover;
    width: 33px;
    height: 33px;
    border-radius: 50%;
`;

export const TopNav = styled.nav`
    margin-left: 10px;
    list-style-type: none;
    display: grid;
    grid-template-columns: 66px repeat(5, 43px);
    width: 100%;
    height: 100%;

    & > li {
        height: 43px;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & > li a {
        background-color: transparent;
        /* display: inline-block; */
        text-decoration: none;
        font-size: 12px;
        font-weight: 600;
        color: white;
        height: 27px;
        line-height: 28px;
        padding: 0 12px 1px;
        position: relative;
        white-space: nowrap;
        cursor: pointer;
    }

    & > li a:hover {
        background-color: #1d3c78;
    }
`;

export const TopNavProfilePhotoWrapper = styled.a`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    & > span {
        max-width: 50%;
        height: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & > span img {
        border-radius: 50%;
        margin-right: 5px;
        height: 100%;
        width: 27px;
        object-fit: cover;
    }
`;
