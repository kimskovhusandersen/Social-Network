import styled from "styled-components";

const StyledPhotoCollage = styled.div`
    display: grid;
    background: ghostwhite;
    border-radius: 2px;
    padding: 5px;

    grid-template-columns: ${props =>
        props.cols
            ? `repeat(${props.cols}, calc(100% / ${props.cols} - 5px))`
            : `repeat(${3}, calc(100% / ${3} - 5px))`};
    grid-template-rows: auto;
    justify-content: space-evenly;
    grid-gap: 5px;

    & > a {
        cursor: pointer;
        width: calc(100%);
    }

    & > a img {
        width: 100%;
        height: ${props =>
            props.height ? `${props.height / props.cols}px` : `${100 / 3}%`};
        object-fit: cover;
    }
`;

export default StyledPhotoCollage;
