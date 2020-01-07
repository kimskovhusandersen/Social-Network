import styled, { css, createGlobalStyle } from "styled-components";
import { Field } from "formik";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";

//colors
const BLUE = "#385898";

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
        line-height: 1.2;
        background-color: #E9EBEE;
    }

    body {
        display: flex;
        flex-direction: column;
    }
    main {
        position: relative;
    }
`;

export const ProfileWrapper = styled.div`
    display: grid;
    max-width: 100%;
    min-height: 100px;
    /* justify-content: space-between; */
    column-gap: 10px;
    grid-template-columns: 35% calc(65% - 10px);
    grid-auto-flow: row;
`;

export const ProfilePageItem = styled.div`
    background: ghostwhite;
    border-radius: 2px;
    border: 1px solid #ccc;
    padding: 5px;
    margin-bottom: 10px;
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

export const Photo = styled.img.attrs(({ src }) => ({
    src
}))`
    width: ${props => (props.small ? "23px" : "200px")};
    height: ${props => (props.small ? "23px" : "200px")};
    /* border: 1px solid #eee; */
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
