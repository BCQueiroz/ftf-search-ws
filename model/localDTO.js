const LocalAdditionalInfoDTO = require("./localAdditionalInfoDTO")


class LocalDTO { 

    constructor(){
        this.idLocal = 0
        this.nmLocal = ""
        this.nmAddress = ""
        this.cdNumberAddress = 0
        this.nmCity = ""
        this.dhBeginDay = ""
        this.dhEndDay = ""
        this.additionalInfo = undefined
    }
}

module.exports = LocalDTO
