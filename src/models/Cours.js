export default class Cours {
    constructor({ titre }) {
        this._titre = titre;
    }

    /**
     * @returns {string} titre
     */
    get titre() {
        return this._titre;
    }

    /**
     * @params {string}
     */
    set titre(titre) {
        this._titre = titre.trim();
    }

}