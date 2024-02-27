require('dotenv').config()
const passwordValidator = require('password-validator')
const cryptoUtil = require('../utils/CryptoUtil')
const dateUtil = require('../utils/DateUtil')
const userDAO = require('../dao/UserDAO')
const UserLoggedInfoDTO = require('../model/UserLoggedInfoDTO')

class UserController {

    constructor(){
        this.userDAO = new userDAO()
        this.cryptoUtil = new cryptoUtil()
        this.dateUtil = new dateUtil()
        this.validator = new passwordValidator()

        this.validator.is().min(6)
                    .is().max(30)
                    .has().uppercase()
                    .has().lowercase()
                    .has().digits()
                    .has().symbols()
    }

    createUserAccount = async (req) => {
        var data = {}
        if(req && req.body) data = req.body

        this.validateAllParametersForUserCreation(data)
        var usersAlreadyExists = await this.userDAO.userAlreadyExists(data.email)
        if(usersAlreadyExists) throw Error("Já existe um email cadastrado, por favor realize o login ou recupere a senha.")

        var encryptedPassword = await this.cryptoUtil.encryptInfo(data.password)

        var validatedData = {
            nmUser: data.nmUser,
            dtBirthday: data.dtBirthday,
            email: data.email,
            password: encryptedPassword
        }

        try {
            await this.userDAO.createNewUserAccount(validatedData)
        } catch(e) {
            throw Error("Ocorreu um erro ao criar usuário. Erro:" + e)
        }
    }

    userLogin = async(req) => {
        return await this.autenthicateByEmail(req)
    }

    autenthicateByEmail = async(req) => {
        var data = {}
        if(req && req.body) data = req.body

        if(Boolean(data.email) == false || Boolean(data.password) == false) throw Error("Email e/ou senha não foram informados para iniciar validação de login, abortando.")

        var userInfo = await this.userDAO.getUserDataByEmail(data.email)

        if(Boolean(userInfo) == false) throw Error("Não existe usuário cadastrado com esse email. Por favor, confirme se o email está correto, ou crie uma nova conta se ainda não tiver uma.")
    
        var passwordIsOk = await this.cryptoUtil.validateEncryptedInfo(data.password, userInfo.password)

        if(passwordIsOk){
            var userLoggedInfo = new UserLoggedInfoDTO()
            userLoggedInfo.idUser = userInfo.idUser
            userLoggedInfo.nmUser = userInfo.nmUser
            userLoggedInfo.dtBirthday = userInfo.dtBirthday
            userLoggedInfo.isLogged = true
            return userLoggedInfo
        } else {
            throw Error("Senha inválida, tente novamente.")
        }
    }

    recoverPasswordByEmail = async(req) => {
        var data = {}
        if(req && req.body && req.body.idUser && req.body.newPassword && req.body.email) data = req.body 
        else throw Error("Não foram informadas todas as informações para atualizar a senha.")

        var newPasswordHash = await this.validateAndEncryptNewPassword(data)
        try{
            await this.userDAO.updateUserPassword(data.idUser, newPasswordHash)
        } catch(e) {
            throw new Error("Ocorreu um erro ao atualizar a senha, tente novamente.")
        }
    }

    validateAndEncryptNewPassword = async(data) => {
        var isValid = await this.userDAO.validateUserIsValid(data.idUser, data.email)
        if(!isValid) throw new Error("Usuário não encontrado.")

        if(this.validatePassword(data.newPassword) == false) throw new Error('Nova senha não está nos conformes necessários.')

        return await this.cryptoUtil.encryptInfo(data.newPassword)
    }

    validateAllParametersForUserCreation(data){
        if(this.validateNmUser(data.nmUser) == false) throw Error("Nome inválido.")
        if(this.validateDtBirthDay(data.dtBirthday) == false) throw Error("Data de nascimento inválida.")
        if(this.validateEmail(data.email) == false) throw Error("Email inválido.")
        if(this.validatePassword(data.password) == false) throw Error("Senha inválida.")
        return true
    }

    validateNmUser(nmUser) {
        return Boolean(nmUser)
    }

    validateDtBirthDay(dtBirthday) {
        if(!Boolean(dtBirthday)) return false

        try{
            return this.dateUtil.validateDate(dtBirthday)
        } catch(e) {
            return false
        }
    }

    validateEmail(email){
        if(!Boolean(email)) return false

        if (email.includes('@') && email.includes('.')) {
            return true
        } else {
            return false
        }
    }

    validatePassword(password){
        if(!Boolean(password)) return false

        try{
            return this.validator.validate(password)
        } catch(e) {
            return false
        }
    }

}

module.exports = UserController