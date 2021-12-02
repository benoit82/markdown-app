import stylesForm from '@styles/forms.module.css'
import PropTypes from 'prop-types'

const Form = ({handleSubmit, children}) => {

    return (
            <form className={stylesForm.form} onSubmit={handleSubmit}>
                {children}
            </form>
    )
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    handleSubmit: PropTypes.func,
}

export default Form;