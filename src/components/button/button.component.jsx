import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles'

export const BUTTON_TYPE = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE.base) => (
    {
        [BUTTON_TYPE.base]: BaseButton,
        [BUTTON_TYPE.google]: GoogleSignInButton,
        [BUTTON_TYPE.inverted]: InvertedButton
    }[buttonType]
)

const Button = ({ children, buttonType, ...buttonProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton {...buttonProps}> {children} </CustomButton>;
}

export default Button;