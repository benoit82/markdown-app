## Equipe de développement
* Benoît Dubus
* Emmanuel Bebe

## Installation

```bash
npm i
```

Il faut également ajouter manuellement un fichier `.env` à la racine du projet avec en propriété `DATABASE_URL` comme par exemple :

```bash
DATABASE_URL="mysql://root:@localhost:3306/markdown_app"
```
Une base de donnée `MySQL` avec le nom `markdown_app` est requis pour le bon fonctionnement de l'application.
## Lancement en local du projet en mode de développement

Pour lancer le projet en mode de développement:

```bash
npm run dev
```

Ouvrir l'adresse [http://localhost:3000](http://localhost:3000) avec votre navigateur.

## Annexe documentations
* [document énoncé du projet](/docs/projet.pdf)
* [document cahier des charges techniques](/docs/doc_technique.pdf)
  * [Le même document en version Google Drive](https://docs.google.com/document/d/1kxFDJFnZddV04VGGnrlX4-xreHpEelVhE1q24UwYcRc/edit?usp=sharing)