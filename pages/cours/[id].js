import CustomHead from '@components/CustomHead'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '@styles/cours/global.module.css'
import PropTypes from 'prop-types'

const coursDisplay = ({cours, id}) => {
    const pageTitle = `Cours - #${id}`;
    const headProps = { pageTitle, metaName: 'CoursPage', metaContent: pageTitle };

    return (
    <>
        <CustomHead {...headProps} />
        <main className={styles.mainFrame}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {cours}
            </ReactMarkdown>
        </main>
    </>
    )
}

export async function getServerSideProps({params}) {
    // TODO API call here
    const cours = `## Cours n°${params.id}`;

    return {
        props: {
            cours,
            id: params.id,
        }
    }
}

coursDisplay.propTypes = {
    cours: PropTypes.string,
    id: PropTypes.string,
}

export default coursDisplay;