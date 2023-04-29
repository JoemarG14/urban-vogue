import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as UrbanLogo } from '../../assets/logo.svg'

export const NavigationContainer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 35px;
  `

export const LogoContainer = styled(Link)`
  height: 100%;
  padding: 25px;
`

export const Logo = styled(UrbanLogo)`
  width: 100px;
  height: auto;
  position: relative;
  top: -6px;
`

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NavLink = styled(Link)`
  padding: 10px 35px;
  font-size: 20px;
  cursor: pointer;
  max-width: 134px;
  min-width: 134px;
  text-align: center;
  color: black;
  font-weight: 600;

  &:hover {
    color: #fd9b3d;
    transition: transform .2s ease;
    transform: scale(1.15);
  }
`

