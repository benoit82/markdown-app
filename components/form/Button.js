import stylesForm from '@styles/forms.module.css'
import PropTypes from 'prop-types'

const Button = (props) => {

    return (
            <input { ... props } />
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit']).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Button;