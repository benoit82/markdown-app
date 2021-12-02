import stylesForm from '@styles/forms.module.css'
import PropTypes from 'prop-types'

const TextArea = (props) => {

    const {labelText, name, ... inputProps} = props;
    return (
        <div className={stylesForm.inputGroup}>
            <label htmlFor={name}>{labelText}</label>
            <textarea className={stylesForm.textArea} name={name} {... inputProps }></textarea>
        </div>
    )
}

TextArea.propTypes = {
    labelText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
}

export default TextArea;