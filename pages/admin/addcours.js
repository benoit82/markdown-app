import { useState } from 'react'
import Head from 'next/head'
import stylesForm from '@styles/forms.module.css'
import CustomHead from '@components/CustomHead'
import { Form, Input, TextArea, Button } from '@components/form'

export default function addCours() {
    const pageTitle = 'Formulaire d\'edition de cours';
    const headProps = { pageTitle, metaName: 'CoursFormPage', metaContent: pageTitle };

    const resetCours = { contenuMd: '', resume: '', estArchive: false, titre: '', categorie: ''};
    const [cours, setCours] = useState(resetCours);

    const handleChange = ({target}) => setCours({...cours, [target.name]: target.value });

    const handleResetBtn = () => {
        setCours(resetCours);
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const copyCours = {... cours};
        // TODO : traitement userToApi avant envoi (trouver un moyen de crypter le mot de passe ?)
        console.log('appel d\'envoi des données cours :',copyCours);
        // TODO : envoyer les données users vers l'API
    }

    const {titre, resume, categorie, estArchive, contenuMd } = cours;
    return (
    <div>
        <CustomHead {...headProps} />
        <main>
            <h1>{pageTitle}</h1>
            <Form handleSubmit={handleSubmitForm}>
                <Input 
                    name="titre"
                    labelText="Titre du cours"
                    type="text"
                    id="titre"
                    value={titre}
                    onChange={handleChange}
                    required
                    />
                <TextArea 
                    name="resume"
                    labelText="résumé du cours"
                    id="resume"
                    value={resume}
                    onChange={handleChange}
                    required
                    />
                <Input 
                    name="categorie"
                    labelText="Catégories"
                    type="text"
                    id="categorie"
                    value={categorie}
                    onChange={handleChange}
                    />
                <Input 
                    name="estArchive"
                    labelText="archivé"
                    type="checkbox"
                    id="estArchive"
                    value={estArchive}
                    onChange={handleChange}
                    />
                <TextArea 
                    name="contenuMd"
                    labelText="Contenu du cours en markdown"
                    id="contenuMd"
                    value={contenuMd}
                    onChange={handleChange}
                    required
                    />
                <div className={stylesForm.btnGroup}>
                    <Button type="submit" name="submitBtn" id="submitBtn" value="Envoyer" />
                    <Button type="button" name="resetBtn" id="resetBtn" value="Reset" onClick={handleResetBtn} />
                </div>
            </Form>
        </main>
    </div>
  )
}

