const express = require('express')
const UserController = require('../controller/userController')

class UserService {

    constructor(){
        this.routes = express.Router()
        this.userController = new UserController()

        this.routes.post('/create-user-account', express.json(), this.createUserAccount.bind(this))
        this.routes.post('/user-login', express.json(), this.userLogin.bind(this))
        this.routes.post('/recover-password-by-email', express.json(), this.recoverPasswordByEmail.bind(this))
    }

    createUserAccount = async(req, res) => {
        try {
            await this.userController.createUserAccount(req)
            res.send({ success: true, message: 'Usuário criado com sucesso!', result: {}})
        } catch(e) {
            throw Error('Ocorreu um erro ao criar conta.')
        }
    }

    userLogin = async(req, res) => {
        try{
            var userLoggedInfo = await this.userController.userLogin(req)
            res.send({ success: true, message: "Usuário logado com sucesso.", result: {userLoggedInfo: userLoggedInfo}})
        } catch(e) {
            res.send( { success: false, message: "Ocorreu um erro no login.", result: {}})
        }
    }

    recoverPasswordByEmail = async(req, res) => {
        try{
            await this.userController.recoverPasswordByEmail(req)
            res.send({ success: true, message: "Senha atualizada com sucesso.", result: {}})
        } catch(e) {
            throw Error('Ocorreu um erro ao recuperar a senha.')
        }
    }
}

module.exports = UserService
