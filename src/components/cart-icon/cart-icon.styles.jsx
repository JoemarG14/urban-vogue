import styled from "styled-components";
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'


export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  bottom: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const CartIconBag = styled(ShoppingIcon)`
  width: 40px;
  height: 40px;
`

export const CartIconItemCount = styled.span`
  position: absolute;
  font-size: 15px;
  font-weight: bold;
  bottom: 8px;
`
