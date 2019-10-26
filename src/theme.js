import styled, { css, createGlobalStyle } from "styled-components";
import { Field } from "formik";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html {
        height: 100%;
        width: 100%;
    }


`;

export const PageWrapper = styled.section`
    font-family: system-ui;
    font-size: 1rem;
    line-height: 1.5rem;
    min-height: calc(100vh - 120px);
    max-width: 100vw;
    padding: 1rem 0.75rem;
    border: 1px solid #eee;
    border-radius: 4px;
`;

export const CodeWrapper = styled.pre`
    font-family: monospace;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background-color: hsl(210, 4%, 96%);
    overflow: auto;
    padding: 0.75rem;
    margin: 0;
    border-radius: 4px;

    & strong {
        margin-top: 1.5rem;

        &:first-child {
            margin-top: 0;
        }
    }
`;

export const Header = styled.header`
    background-color: #f1f1f1;
    overflow: hidden;
    width: 100%;
    height: 60px;
    padding: 5px 2px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const TopNav = styled.nav`
    overflow: hidden;
    background-color: #e9e9e9;
`;

export const Link = styled.a`
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
        color: black;
    }
`;

export const Search = styled.input`
    padding: 6px;
    border: none;
    margin-top: 8px;
    margin-right: 16px;
    font-size: 17px;
    padding: 0.5em;
    margin: 0.5em;
    background: papayawhip;
    border: none;
    border-radius: 3px;
`;

export const TopSection = styled.section``;

// Images
export const Image = styled.img.attrs(({ src }) => ({
    src: src
        ? src
        : "https://s3.amazonaws.com/coriander-imageboard/U1GUVtl_0XWSE9kOkMY0QXmVAuL5sRw1.jpg"
}))`
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
`;

export const Logo = styled.img`
    background-image: url("https://s3.amazonaws.com/coriander-imageboard/ysYB3LtmBepQl9fHDGL8V6KZ9U6CdzVv.jpg");
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

// Forms, inputs, buttons

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
    font-size: 1rem;
    line-height: 1.5rem;
    font-style: normal;
    font-weight: 400;
    width: 100%;
    margin-top: 0.5rem;
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
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
`;

// Text

export const Title = styled.h1`
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    color: #4d4d4d;
    font-size: 2.2em;
`;

export const Title2 = styled.h2`
    font-family: "Raleway", sans-serif;
    font-weight: 300;
    color: #4d4d4d;
    font-size: 1.8em;
`;

export const Text = styled.p`
    font-family: "Raleway", sans-serif;
    color: ${props => props.color || "#4d4d4d"};
`;
export const Hr = styled.hr`
    display: block;
    border: none;
    border-top: 1px solid lightgrey;

    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`;

export const Footer = styled.footer`
    background-color: #f1f1f1;
    overflow: hidden;
    width: 100%;
    height: 60px;
    padding: 20px 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`;
