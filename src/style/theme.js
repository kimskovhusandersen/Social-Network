import styled, { css, createGlobalStyle } from "styled-components";
import { Field } from "formik";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html,
    body {
        margin: 0;
        height: 100%;
        min-height: 100%;
        line-height: 1.2
    }

    body {
        display: flex;
        flex-direction: column;
        background: #ddd;
    }
`;

export const PageWrapper = styled.div`
    justify-content: center;
    transform: translateX(-5%);
    flex: auto;
    display: flex;
    margin-bottom: 10px;
    /* background-color: #929292; */
`;

export const Page = styled.div`
    min-height: 100vh;
    margin-top: 43px;
    width: 63%;
    background: ghostwhite;
`;

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

export const TopSection = styled.div`
    width: 100%;
    height: 350px;
    position: relative;
`;

export const HeroImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-height: 100%;
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
    border: 1px solid #eee;
    /* border: 4px solid red; */
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
    border: none;
    object-fit: cover;
    z-index: 2;
    color: white;
    font-size: 26px;
    font-weight: bold;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
    /* border: 4px solid red; */
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
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
`;

export const TimelineWrapper = styled.div`
    /* border: 1px solid red; */
    display: grid;
    max-width: 100%;
    min-height: 200px;
    /* grid-template: 43px 1fr 30px / 100%; */
    display: grid;
    column-gap: 20px;
    grid-template-columns: 35% calc(65% - 20px);
    grid-auto-flow: row;
    /* or 'row', 'row dense', 'column dense' */
`;

export const TimelineSmallItem = styled.div`
    border: 1px solid yellow;
    padding: 10px;
    margin-bottom: 10px;
`;

export const TimelineLargeItem = styled.section`
    border: 1px solid blue;
    padding: 10px;
    margin-bottom: 10px;
`;

export const MainNav = styled.nav`
    background-color: #fff;
    height: 43px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
`;

export const StyledFooter = styled.footer`
    flex: none;
    background-color: red;
    height: 43px;
    z-index: 999;
    overflow: hidden;
`;

// -----
export const TopNavItem = styled.a`
    position: relative;
    float: left;
    display: block;
    height: 100%;
    width: 45px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border-radius: 2px;
    padding: 0 1px;

    &:hover {
    }

    > * {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const SearchWrapper = styled.div`
    width: 300px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SearchInput = styled.input`
    width: 90%;
    padding: 6px;
    border: none;
    font-size: 13px;
    padding: 0.5em;
    border: none;
    border-radius: 3px;

    &:focus {
    }
`;

export const SearchResult = styled.div`
    position: absolute;
    min-height: 0px;
    width: 90%;
    top: 34px;
    left: 2px;
    z-index: 1;
`;

export const SearchResultItem = styled.a`
    display: block;
    height: calc(100% / 10);
    font-size: 14px;
    text-decoration: none;
    width: 100%;
    padding: 5px;
    cursor: pointer;

    &:hover {
    }

    font-weight: ${props => (props.last ? "bold" : "normal")};
`;

// Images

export const Photo = styled.img.attrs(({ src }) => ({
    src
}))`
    width: ${props => (props.small ? "23px" : "200px")};
    height: ${props => (props.small ? "23px" : "200px")};
    /* border: 1px solid #eee; */
    border-radius: 50%;
`;

export const Logo = styled.img`
    background-image: url("https://s3.amazonaws.com/coriander-imageboard/ysYB3LtmBepQl9fHDGL8V6KZ9U6CdzVv.jpg");
    background-size: cover;
    width: 33px;
    height: 33px;
    border-radius: 50%;
`;

export const Form = styled.form`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Input = styled(Field)`
    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 4px;
    line-height: 80%;
    font-weight: 400;
    width: 100%;
    padding: 0.75rem 0.75rem;

    &:focus,
    &:active {
        box-shadow: rgb(210, 213, 217) 0px 0px 2px 1px,
            rgb(227, 230, 232) 0px 0px 0px 3px;
        border: 1px solid rgb(26, 33, 43);
        outline: none;
    }

    /* Autocomplete styles in Chrome*/
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        background-color: white;
        border: 1px solid lightgrey;
        box-shadow: 0 0 0px 1000px #fff inset;
        -webkit-box-shadow: 0 0 0px 1000px #fff inset;
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: black;
    }

    ${({ valid }) =>
        valid &&
        css`
            border: 1px solid rgb(0, 156, 38);

            &:focus,
            &:active {
                border: 1px solid rgb(0, 156, 38);
                box-shadow: rgb(106, 237, 97) 0px 0px 2px 1px,
                    rgb(177, 247, 160) 0px 0px 0px 3px;
                outline: none;
            }

            /* Autocomplete styles in Chrome*/
            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus {
                border: 1px solid rgb(0, 156, 38);
            }
        `}

    ${({ error }) =>
        error &&
        css`
            border: 1px solid rgb(191, 49, 12);
            outline: none;

            &:focus,
            &:active {
                box-shadow: rgb(244, 129, 116) 0px 0px 2px 1px,
                    rgb(251, 178, 174) 0px 0px 0px 3px;
                border: 1px solid rgb(191, 49, 12);
                outline: none;
            }

            /* Autocomplete styles in Chrome*/
            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus {
                border: 1px solid rgb(191, 49, 12);
            }
        `}
`;

export const Label = styled.label`
    color: #777;
    font-size: 0.8em;
    margin: 0.5em 0;
`;

export const Button = styled.button`
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 5px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
    }
`;

export const Link = styled.a``;
export const Title = styled.h1``;
export const Text = styled.p``;
