import styled, { css, createGlobalStyle } from "styled-components";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";

export const TopSectionWrapper = styled.div`
    justify-content: center;
    transform: translateX(${TRANSLATE_PAGE});
    flex: auto;
    display: flex;
    /* background-color: #929292; */
`;

export const TopSection = styled.div`
    width: ${PAGE_WIDTH}px;
`;

export const HeroWrapper = styled.div`
    width: 100%;
    height: 350px;
    border: 1px solid #000;
    border-color: rgba(0, 0, 0, 0.25);
    border-bottom: none;
    border-top: none;

    position: relative;
`;

export const HeroImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const HeroProfilePhoto = styled.img`
    position: absolute;
    bottom: -25px;
    left: 25px;
    width: 150px;
    height: 150px;
    border: none;
    border-radius: 50%;
    object-fit: cover;
    z-index: 2;
    padding: 3px;
    background: white;
`;

export const HeroName = styled.span`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 200px;
    bottom: 0px;
    left: 190px;
    object-fit: cover;
    z-index: 2;

    border: none;
    color: white;
    font-size: 26px;
    font-weight: bold;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
`;

export const SecondaryNav = styled.ul`
    display: grid;
    grid-template-columns: 33% repeat(4, 1fr);
    list-style-type: none;
    width: 100%;
    height: 100%;

    & > li {
        display: inline;
        float: right;
    }
    & > li a {
        border-right: 1px solid #e9eaed;
        font-size: 14px;
        font-weight: 600;
        height: 43px;
        line-height: 3.05;
        padding: 0 17px;
        position: relative;
        vertical-align: middle;
        white-space: nowrap;
        color: #385898;
        cursor: pointer;
        display: block;
        text-align: center;
        text-decoration: none;
    }

    & > li a:hover {
        background-color: #efefef;
    }
`;

export const SecondarySection = styled.nav`
    background-color: #fff;
    height: 43px;
    width: 100%;
    border: ${BORDER}
    border-top: none;
    margin-bottom: 10px;
`;
