import stylesForm from '@styles/forms.module.css'
import PropTypes from 'prop-types'

const Input = (props) => {

    const {labelText, name, ... inputProps} = props;
    return (
        <div className={stylesForm.inputGroup}>
            <label htmlFor={name}>{labelText}</label>
            <input name={name} {... inputProps } />
        </div>
    )
}

Input.propTypes = {
    labelText: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email']).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
}

export default Input;