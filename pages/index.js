import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/Home.module.css'
import CustomHead from '@components/CustomHead'

export default function Home() {

    const pageTitle = 'Accueil';
    const headProps = { pageTitle, metaName: 'HomePage', metaContent: pageTitle };


  return (
    <>
      <CustomHead {...headProps} />
      <main>
        <h1>Markdown App</h1>
        <p>notre application commence ici...☕️</p>
      </main>
    </>
  )
}
