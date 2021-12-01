import Head from 'next/head'
import Image from 'next/image'
import Cours from '@models/Cours'
import styles from '@styles/Home.module.css'
import CustomHead from '@components/CustomHead'

export default function Login() {
    const pageTitle = 'Page de connection';
    const headProps = { pageTitle, metaName: 'LoginPage', metaContent: pageTitle };

  return (
    <div className={styles.container}>
    <CustomHead {...headProps} />
      <main>
        <h1>{pageTitle}</h1>
        <p>notre application commence ici...☕️</p>
      </main>
    </div>
  )
}
