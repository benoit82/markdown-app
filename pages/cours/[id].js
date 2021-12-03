import CustomHead from '@components/CustomHead'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '@styles/cours/global.module.css'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

async function  getOneCours(coursId) {
   const response =  await fetch('http://localhost:3000/api/server', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({query:`{
cours(coursId: "${coursId}") {
    id
    titre
    contenuMd
    resume
    author {
      id
      name
      email
    }
  }
    }`})
   })
   const rsponseBody =  await response.json();
   return rsponseBody.data.cours;
}

const coursDisplay = () => {
    const pageTitle = `Cours -`;
    const headProps = { pageTitle, metaName: 'CoursPage', metaContent: pageTitle };
    
    const { query } = useRouter();

    const [cours, setCours] = useState(null)

    useEffect(() => {
        const {id} = query;
        if (id) getOneCours(id).then(setCours);
    }, [query, setCours])

    return (
    <>
        <CustomHead {...headProps} />
        <main className={styles.mainFrame}>
            {cours &&
            <>
            <div style={{padding: "2rem", backgroundColor: '#9F9F9F'}}>
                <p>Cours id : {cours.id}</p>
                <p>Titre : {cours.titre}</p>
                <p>Resume : {cours.resume ? cours.resume : '<aucun>'}</p>
                <p>Auteur : {cours.author.name} - {cours.author.email}</p>
            </div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {cours.contenuMd}
            </ReactMarkdown>
            </>
             }
        </main>
    </>
    )
}

// export async function getServerSideProps({params}) {
//     const cours = await getOneCours(params.id);

//     return {
//         props: {
//             cours
//         }
//     }
// }

coursDisplay.propTypes = {
    cours: PropTypes.object,
}

export default coursDisplay;