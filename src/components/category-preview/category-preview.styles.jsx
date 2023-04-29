import styled from "styled-components";
import { keyframes } from "styled-components";

const arrowBackAndForth = keyframes`
  0% { transform: translateX(0px) }
  50% { transform: translateX(5px) }
  100% { transform: translateX(0px) }
`

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

export const CategoryPreviewTitle = styled.h2`
  width: fit-content;
  cursor: pointer;
  display: flex;
  margin-bottom: 25px;

  .title {
    font-size: 28px;
  }

  .arrows {
    margin-left: 5px;
    margin-top: -1px;
    opacity: 0.6;
    letter-spacing: -4.5px;
    font-weight: 200;
  }

  &:hover > .arrows {
    transition: transform .5s ease;
    animation: ${arrowBackAndForth} 1s ease infinite forwards;
  }
`

export const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`