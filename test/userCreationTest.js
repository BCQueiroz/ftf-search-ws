const assert = require('assert')
const UserController = require('../controller/UserController')

describe('Testar validações para criação de usuario', function() {

    const userController = new UserController()

    describe('Testar validação de nome do usuário', function() {
        it('Testar string vazia como nome', function() {
            var name = ""
            try{
                var result = userController.validateNmUser(name)
            } catch (e) {
                var result = false
            }
            assert.deepEqual(result, false)
        })

        it('Testar string com valor como nome', function() {
            var name = "Alex"
            var result = userController.validateNmUser(name)
            assert.deepEqual(result, true)
        })
    })

    describe('Testar validação de data de nascimento', function(){
        it('Testar variavel vazia, simular o não envio da variável de data', function(){
            var dtBirthday
            var result = userController.validateDtBirthDay(dtBirthday)
            assert.deepEqual(result, false)
        })

        it('Testar variavel com valor, porém valor invalido como data', function(){
            var dtBirthday = "2020"
            var result = userController.validateDtBirthDay(dtBirthday)
            assert.deepEqual(result, false)
        })

        it('Testar variavel com valor, formato de data válida porém fora do padrão yyyyMMdd', function(){
            var dtBirthday = "03-01-2002"
            var result = userController.validateDtBirthDay(dtBirthday)
            assert.deepEqual(result, false)
        })

        it('Testar variavel com valor, formato de data válida no padrão yyyyMMdd', function(){
            var dtBirthday = "20020103"
            var result = userController.validateDtBirthDay(dtBirthday)
            assert.deepEqual(result, true)
        })
    })

    describe('Testar validação para email válido', function(){
        it('Testar variável vazia, valor do email não ser enviado', function(){
            var email
            var result = userController.validateEmail(email)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, valor do email como string vazia', function(){
            var email = ""
            var result = userController.validateEmail(email)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, email com formato inválido, versão 1', function(){
            var email = "alfa.romeo.com"
            var result = userController.validateEmail(email)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, email com formato inválido, versão 2', function(){
            var email = "alfa@romeocom"
            var result = userController.validateEmail(email)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, email com formato válido', function(){
            var email = "alfa@romeo.com"
            var result = userController.validateEmail(email)
            assert.deepEqual(result, true)
        })
    })

    describe('Testar validação de senha válida', function(){
        it('Testar variável vazia, simular não envio de informação na requisição', function(){
            var password
            var result = userController.validatePassword(password)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor de string vazia', function(){
            var password = ""
            var result = userController.validatePassword(password)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, porém inválido como senha, não tem caracteres minusculos', function(){
            var password = "AA@2DDDDDV"
            var result = userController.validatePassword(password)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, porém inválido como senha, não tem caracteres maiusculos', function(){
            var password = "aa@23fghure"
            var result = userController.validatePassword(password)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, porém inválido como senha, não tem digitos', function(){
            var password = "aB@Kopfghure"
            var result = userController.validatePassword(password)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, porém inválido como senha, não tem caracteres especiais', function(){
            var password = "aB39j0Kopfghure"
            var result = userController.validatePassword(password)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, porém inválido como senha, tem todos os tipos de caracteres, porém não tem a quantidade minima de caracteres', function(){
            var password = "aB@51"
            var result = userController.validatePassword(password)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, porém inválido como senha, tem todos os tipos de caracteres, porém excede a quantidade maxima de caracteres', function(){
            var password = "aB@5h1567hfGDtgsf34%GSGhnbaLKJSG678sbvASft345dfts_90ko-BP"
            var result = userController.validatePassword(password)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, porém inválido como senha, não tem caracteres especiais e nem numeros', function(){
            var password = "AbCdEfGIOjh"
            var result = userController.validatePassword(password)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, porém inválido como senha, não tem letras maiusculas nem minusculas', function(){
            var password = "0-9-8@3_5-12"
            var result = userController.validatePassword(password)
            assert.deepEqual(result, false)
        })

        it('Testar variável com valor, senha válida dentro dos padrões estabelidos', function(){
            var password = "Testando_458"
            var result = userController.validatePassword(password)
            assert.deepEqual(result, true)
        })

        it('Testar variável com valor, senha válida dentro dos padrões estabelidos, outra versão', function(){
            var password = "47_eu-ESTIVE-AQui"
            var result = userController.validatePassword(password)
            assert.deepEqual(result, true)
        })
    })
})