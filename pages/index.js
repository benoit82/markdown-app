import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/Link'
import styles from '@styles/Home.module.css'
import CustomHead from '@components/CustomHead'
import { gql, useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from 'react'

async function  getCours() {
   const response =  await fetch('http://localhost:3000/api/server', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({query:`{
      drafts {
        id
        titre
        contenuMd
        resume
      }
    }`})
   })
   const rsponseBody =  await response.json();
   return rsponseBody.data.drafts;
}

function Home() {
    const pageTitle = 'Accueil';
    const headProps = { pageTitle, metaName: 'HomePage', metaContent: pageTitle };

    const [cours, setCours] = useState([]);

    useEffect(() => {
      getCours().then(setCours);
    }, [setCours])

  return (
    <>
      <CustomHead {...headProps} />
      <main>
        <h1>Markdown App</h1>
        <p>notre application commence ici...☕️</p>
        <ul>
          {cours.length > 0 && cours.map(({titre, id}) => 
            (<li key={id}>
              <Link href={`/cours/${id}`}>
                <a>{titre}</a>
              </Link>
            </li>)
          )}
        </ul>
      </main>
    </>
  )
}

export default Home;