import styled from "styled-components";
import { ReactComponent as GoogleSvg } from '../../assets/google_logo.svg'

export const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 380px;

    h2 {
        margin: 10px 0;
    }
`

export const SignInButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const GoogleLogo = styled(GoogleSvg)`
    background: white;
    padding: 12px;
    width: 49px;
    height: 48px;
`
