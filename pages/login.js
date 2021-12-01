import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/Link'
import Cours from '@models/Cours'
import styles from '@styles/Login.module.css'
import stylesForm from '@styles/forms.module.css'
import CustomHead from '@components/CustomHead'

export default function Login() {
    const pageTitle = 'Page de connection';
    const headProps = { pageTitle, metaName: 'LoginPage', metaContent: pageTitle };

  return (
    <div>
        <CustomHead {...headProps} />
        <main>
            <h1>{pageTitle}</h1>
            <form action="GET" className={stylesForm.form}>
                <div className={stylesForm.inputGroup}>
                    <label htmlFor="username">Utilisateur</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className={stylesForm.inputGroup}>
                    <label htmlFor="password">mot de passe</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className={stylesForm.btnGroup}>
                    <input type="submit" name="submitBtn" id="submitBtn" />
                    <input type="button" name="resetBtn" id="resetBtn" value="Reset" />
                </div>
                <div className={stylesForm.helperGroup}>
                    <Link href="/resetpassword">
                        <a className={styles.lostPassword}>mot de passe perdu ?</a>
                    </Link>
                </div>
            </form>
        </main>
    </div>
  )
}
