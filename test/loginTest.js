const assert = require('assert')
const UserController = require('../controller/UserController')

describe('Testar funções do login e recuperação de senha', function(){
    const userController = new UserController()

    describe('Testar cenários para login', function(){
        it('Email e senha não serem enviados na requisição', async function(){
            var data = {}
            try{
                var result = await userController.autenthicateByEmail(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Email não foi enviado na requisição', async function(){
            var data = {
                password: "abgf-9iK"
            }
            
            try{
                var result = await userController.autenthicateByEmail(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Senha não foi enviada na requisição', async function(){
            var data = {
                email: "aghury5@gmail.com"
            }
            
            try{
                var result = await userController.autenthicateByEmail(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Email e senha foram enviados porém não existe cadastro para o email', async function(){
            var data = {
                email: "aghury5@gmail.com",
                password: "abgf-9iK"
            }
    
            try{
                var result = await userController.autenthicateByEmail(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Email e senha foram enviados, existe cadastro para o email, porém a senha não confere', async function(){
            var data = {
                email: "teste98@uol.com",
                password: "Teste_34190"
            }
    
            try{
                var result = await userController.autenthicateByEmail(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Email e senha foram enviados, existe cadastro para o email, a senha confere, logo, deve autenticar com sucesso', async function(){
            var data = {
                email: "teste98@uol.com",
                password: "Teste_304343"
            }
    
            try{
                var result = await userController.autenthicateByEmail(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), true)
        })
    })

    describe('Testar cenários de recuperar a senha', function(){
        it('Informações não foram enviados na requisição', async function(){
            var data
            try{
                var result = await userController.validateAndEncryptNewPassword(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Somente algumas informações foram enviados na requisição, primeiro cenário', async function(){
            var data = {
                idUser: -1
            }
            try{
                var result = await userController.validateAndEncryptNewPassword(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Somente algumas informações foram enviados na requisição, segundo cenário', async function(){
            var data = {
                newPassword: "gfste7f90"
            }
            try{
                var result = await userController.validateAndEncryptNewPassword(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Somente algumas informações foram enviados na requisição, terceiro cenário', async function(){
            var data = {
                email: "teste98@uol.com"
            }
            try{
                var result = await userController.validateAndEncryptNewPassword(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Todas as informações foram enviados na requisição, porém o idUser é inválido', async function(){
            var data = {
                email: "teste98@uol.com",
                newPassword: "TEste-90",
                idUser: -1
            }
            try{
                var result = await userController.validateAndEncryptNewPassword(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Todas as informações foram enviados na requisição, porém o email é inválido', async function(){
            var data = {
                email: "testeuol-com",
                newPassword: "gfste7f90",
                idUser: 3
            }
            try{
                var result = await userController.validateAndEncryptNewPassword(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Todas as informações foram enviados na requisição, idUser e email são válidos, porém a senha não está nos conformes', async function(){
            var data = {
                email: "teste98@uol.com",
                newPassword: "gfste7f90",
                idUser: 3
            }
            try{
                var result = await userController.validateAndEncryptNewPassword(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Todas as informações foram enviados na requisição, todas as informações são válidas', async function(){
            var data = {
                email: "teste98@uol.com",
                newPassword: "gfs_TE7f90",
                idUser: 3
            }
            try{
                var result = await userController.validateAndEncryptNewPassword(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), true)
        })
    })
})