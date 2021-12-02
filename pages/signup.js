import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/Link'
import styles from '@styles/Login.module.css'
import stylesForm from '@styles/forms.module.css'
import CustomHead from '@components/CustomHead'
import { Form, Input, Button } from '@components/form'

export default function signUpUser() {
    const pageTitle = 'Inscription';
    const headProps = { pageTitle, metaName: 'SignUpPage', metaContent: pageTitle };

    // TODO : resetUser = new Utilisateur(), to be implemented
    const resetUser = { name: '', email: '', password: ''};
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

    const {email, name, password} = user;
    return (
    <div>
        <CustomHead {...headProps} />
        <main>
            <h1>{pageTitle}</h1>
            <Form handleSubmit={handleSubmitForm}>
                <Input 
                    name="email"
                    labelText="Email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    required
                    />
                <Input 
                    name="name"
                    labelText="Utilisateur"
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    required
                    />
                <Input
                    name="password"
                    labelText="mot de passe"
                    type="password"
                    id="password"
                    minLength="3"
                    value={password}
                    onChange={handleChange}
                    required
                    />
                <div className={stylesForm.btnGroup}>
                    <Button type="submit" name="submitBtn" id="submitBtn" value="Envoyer" />
                </div>
            </Form>
        </main>
    </div>
  )
}

