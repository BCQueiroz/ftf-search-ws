const bcrypt = require('bcrypt')

class CryptoUtil{

    constructor(){
        this.salt = 8
    }

    encryptInfo = async(info) => {
        const hash = await bcrypt.hash(info, this.salt);
        return hash;
    }

    validateEncryptedInfo = async(infoToCompare, hash) => {
        const match = await bcrypt.compare(infoToCompare, hash);
        return match;
    }
}

module.exports = CryptoUtil