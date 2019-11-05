import styled from "styled-components";

let PAGE_WIDTH = 900;
let TRANSLATE_PAGE = "-3%";
const BORDER = "1px solid #ccc";

export const ChatWrapper = styled.div`
    border: 1px solid red;
    height: 300px;
    overflow-y: scroll;
`;

export const StyledTextArea = styled.textarea`
    width: 100%;
    min-height: 100px;
`;
