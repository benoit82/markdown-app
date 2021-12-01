import bcrypt from 'bcrypt'


class Encrypt {

    constructor(userPasswordInput) {
        this.userPasswordInput = userPasswordInput;
        this.saltRounds = 10;
        this.crypted = "";
    }

    /**
     * 
     * @returns {string} encrypted password
     */
    getValueEncrypted() {
        this.crypted = bcrypt.hashSync(this.userPasswordInput, this.saltRounds);
        return this.crypted;
    }

    /**
     * take in parameter the string from DB to compare with user information typed
     * @param {string} passwordFromDb
     * @returns {bool} encrypted password is correct
     */
    comparePassword(passwordFromDb) {
        return bcrypt.compareSync(passwordFromDb, this.getValueEncrypted());
    }
}

export default Encrypt;