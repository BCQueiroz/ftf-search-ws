const assert = require('assert')
const UserController = require('../controller/UserController')

describe('Testar funções do login', function(){
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
                password: "Teste_34123"
            }
    
            try{
                var result = await userController.autenthicateByEmail(data)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), true)
        })
    })
})