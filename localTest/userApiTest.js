const UserDAO = require('../dao/userDAO')

describe("Testando serviços referentes ao login do usuário", function(){

    const userDAO = new UserDAO()
    const dsEmail = "abc.com"
    const idUser = 5

    it("userAlreadyExistsV2", async function() {
        const result = await userDAO.userAlreadyExistsV2(dsEmail)
        console.log(result)
    })

    it("getUserDataByEmailV2", async function() {
        const result = await userDAO.getUserDataByEmailV2(dsEmail)
        console.log(result)
    })

    it("validateUserIsValidV2", async function() {
        const result = await userDAO.validateUserIsValidV2(idUser, dsEmail)
        console.log(result)
    })
})