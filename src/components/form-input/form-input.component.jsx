import { FormInputGroup, FormInputLabel, Input } from './form-input.styles'

const FormInput = ({ label, ...inputProps }) => {
    return (
        <FormInputGroup>

            <Input autoComplete="none" {...inputProps} />
            {label && (
                <FormInputLabel shrink={inputProps.value.length}>{label}</FormInputLabel>
            )}
        </FormInputGroup>
    )
}

export default FormInput;