import styled, { css, createGlobalStyle } from "styled-components";
import { Field } from "formik";

const bgCol1 = "#461220";
const bgCol2 = "#FCB9B2";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        line-height: 1.2;
    }
    html, body, main {
        margin: 0;
        height: 100%;
        min-height: 100%;
    }
    main {
        display: flex;
        flex-direction: column;
    }


`;

export const PageWrapper = styled.section`
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center;
    justify-content: center; */
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    /* flex: auto; */
    font-family: system-ui;
    font-size: 1rem;
    line-height: 1.5rem;
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

export const NavWrapper = styled.header`
    flex: none;
    width: 100%;
    height: 43px;
    padding: 0px 2px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    background: "grey";
`;

export const TopNav = styled.nav`
    overflow: hidden;
    height: 60%;
    font-size: 15px;
`;

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

export const TopSection = styled.section``;

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

// Text

export const Title = styled.h1`
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size: 2.2em;
`;

export const Title2 = styled.h2`
    font-family: "Raleway", sans-serif;
    font-weight: 300;
    font-size: 1.8em;
`;

export const Text = styled.p`
    font-family: "Raleway", sans-serif;
`;

export const Hr = styled.hr`
    display: block;
    border: none;
    border-top: 1px solid lightgrey;

    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`;

export const StyledFooter = styled.footer`
    flex: none;
    overflow: hidden;
    width: 100%;
    height: 30px;
    padding: 2px 1px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`;
