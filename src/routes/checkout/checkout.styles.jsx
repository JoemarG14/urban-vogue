import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 70%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
  font-weight: 600;
`

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`

export const CheckoutHeaderBlock = styled.span`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`

export const CheckoutTotal = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`

export const CheckoutEmptyMessage = styled.div`
  text-align: center;
  opacity: 0.5;
  margin-top: 110px;
  font-size: 36px;
`
