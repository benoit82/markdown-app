import CustomHead from '@components/CustomHead'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '@styles/cours/exemple.module.css'
import { useState } from 'react'

const coursExemple = () => {
    const pageTitle = 'Cours - exemple';
    const headProps = { pageTitle, metaName: 'CoursPage', metaContent: pageTitle };

    const [monCours, setMonCours] = useState("### Mon cours\n Just a link: [google](https://www.google.fr)")

    const handleChange = ({target}) => setMonCours(target.value);

    return (
    <>
        <CustomHead {...headProps} />
        <div className={styles.mdFrame}>
            <section className={styles.section}>
                <textarea className={styles.textArea} name="exemple" cols="30" rows="10" value={monCours} onChange={handleChange}></textarea>
            </section>
            <section className={styles.section}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {monCours}
                </ReactMarkdown>
            </section>

        </div>
    </>
    )
}

export default coursExemple;