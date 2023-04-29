import styled from "styled-components";
import { BaseButton, GoogleSignInButton, InvertedButton } from '../button/button.styles'

export const CartDropDownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 120px;
  right: 40px;
  z-index: 5;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
    width: 100%;
  }
`

export const CartDropDownItemsContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
  }
`

export const CartDropDownEmptyMessage = styled.div`
  text-align: center;
  opacity: 0.5;
  margin-top: 30%;
  font-size: 25px;
`


