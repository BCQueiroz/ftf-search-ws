const SavedLocalDAO = require('../dao/savedLocalsDAO')

describe("Testando serviços referentes a salvar e recuperar locais salvos por usuário", function(){

    const savedLocalDAO = new SavedLocalDAO()
    const idUser = 5
    const idLocal = 7

    it("validateIfUserExistsV2", async function() {
        const result = await savedLocalDAO.validateIfUserExistsV2(idUser)
        console.log(result)
    })

    it("validateIfLocalExistsV2", async function() {
        const result = await savedLocalDAO.validateIfLocalExistsV2(idLocal)
        console.log(result)
    })

    it("getAllLocalsSavedByUserV2", async function() {
        var data = {
            idUser: idUser,
            weekDay: "SEGUNDA"
        }
        const result = await savedLocalDAO.getAllLocalsSavedByUserV2(data)
        console.log(result)
    })

    it("validateIfLocalIsSavedV2", async function() {
        const result = await savedLocalDAO.validateIfLocalIsSavedV2(idUser, idLocal)
        console.log(result)
    })

    it("saveNewLocalInUserListV2", async function() {
        var data = {
            idLocal: idLocal,
            idUser: idUser
        }
        try {
            await savedLocalDAO.saveNewLocalInUserListV2(data)
            var result = true
        } catch(e) {
            var result = false
        }
        console.log(result)
    })

    it("removeLocalFromUserListV2", async function() {
        var data = {
            idLocal: idLocal,
            idUser: idUser
        }
        try {
            await savedLocalDAO.removeLocalFromUserListV2(data)
            var result = true 
        } catch(e) {
            var result = false
        }
        console.log(result)
    })
    
    it("getAllLocalTags", async function() {
        var idLocalList = [2, 4, 28]
        const result = await savedLocalDAO.getAllLocalTags(idLocalList)
        console.log(result)
    })
})