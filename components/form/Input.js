import stylesForm from '@styles/forms.module.css'
import PropTypes from 'prop-types'

const Input = (props) => {

    const {labelText, name, type, ... inputProps} = props;
    return (
        <div className={stylesForm.inputGroup} style={{ flexDirection: type === 'checkbox' ? 'row' : 'column' }}>
            <label htmlFor={name}>{labelText}</label>
            <input name={name} type={type} {... inputProps } />
        </div>
    )
}

Input.propTypes = {
    labelText: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email', 'checkbox']).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
}

export default Input;