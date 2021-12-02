import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/Link'
import styles from '@styles/Login.module.css'
import stylesForm from '@styles/forms.module.css'
import CustomHead from '@components/CustomHead'
import { Form, Input, Button } from '@components/form'

export default function Login() {
    const pageTitle = 'Page de connection';
    const headProps = { pageTitle, metaName: 'LoginPage', metaContent: pageTitle };

    // TODO : resetUser = new Utilisateur(), to be implemented
    const resetUser = { username: '', password: ''};
    const [user, setUser] = useState(resetUser);

    const handleChange = ({target}) => {
        setUser({...user, [target.name]: target.value });
    }

    const handleResetBtn = () => {
        setUser(resetUser);
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const userToApi = {... user};
        // TODO : traitement userToApi avant envoi (trouver un moyen de crypter le mot de passe ?)
        console.log('appel d\'envoi des données user :',userToApi);
        // TODO : envoyer les données users vers l'API
    }

    const {username, password} = user;
    return (
    <div>
        <CustomHead {...headProps} />
        <main>
            <h1>{pageTitle}</h1>
            <Form className={stylesForm.form} handleSubmit={handleSubmitForm}>
                <Input name="username" labelText="Utilisateur" type="text" id="username" value={username} onChange={handleChange} required />
                <Input name="password" labelText="mot de passe" type="password" id="password" value={password} onChange={handleChange} required />
                <div className={stylesForm.btnGroup}>
                    <Button type="submit" name="submitBtn" id="submitBtn" value="Envoyer" />
                </div>
                <div className={stylesForm.helperGroup}>
                    <Link href="/resetpassword">
                        <a className={styles.lostPassword}>mot de passe perdu ?</a>
                    </Link>
                </div>
            </Form>
        </main>
    </div>
  )
}

