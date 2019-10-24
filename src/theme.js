import styled, { css, createGlobalStyle } from "styled-components";
import { Field } from "formik";
const defaultAvatar =
    "https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg";
// Global
const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
  }
`;

export const PageWrapper = styled.section`
    &,
    & * {
        box-sizing: border-box;
        display: block;
    }

    hr {
        display: block;
        border: none;
        border-top: 1px solid lightgrey;

        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    font-family: system-ui;
    font-size: 1rem;
    line-height: 1.5rem;
    max-width: 35em;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1.5rem;
    padding: 1rem 0.75rem;
    border: 1px solid lightgrey;
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
    width: 50px;
    height: 50px;
    border: 1px solid red;
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
    display: flex;
    flex-direction: column;
    color: #777;
    font-family: "Raleway", sans-serif;
    font-size: 0.8em;
    margin: 0.5em 0;
    position: relative;
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
