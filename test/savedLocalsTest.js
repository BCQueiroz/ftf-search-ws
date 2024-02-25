const assert = require('assert')
const SavedLocalsController = require('../controller/SavedLocalsController')

describe('Testar funções de salvar locais como favoritos', function(){
    const savedLocalsController = new SavedLocalsController()

    describe('Testar cenários para salvar novos locais escolhidos pelo usuário', async function(){
        
        it('Falta de informações enviadas pela requisição, faltando tudo', async function(){
            const req = {
                body: {}
            };

            try {
                var isSuccess = await savedLocalsController.validateAndSaveLocalInUserFavorites(req)
            } catch(e) {
                var isSuccess = false
            }
            assert.deepEqual(Boolean(isSuccess), false)
        })

        it('Falta de informações enviadas pela requisição, faltando o id do usuário', async function(){
            const req = {
                body: {
                    idLocal: 2
                }
            };

            try {
                var isSuccess = await savedLocalsController.validateAndSaveLocalInUserFavorites(req)
            } catch(e) {
                var isSuccess = false
            }
            assert.deepEqual(Boolean(isSuccess), false)
        })

        it('Falta de informações enviadas pela requisição, faltando o id do local', async function(){
            const req = {
                body: {
                    idUser: 1
                }
            };

            try {
                var isSuccess = await savedLocalsController.validateAndSaveLocalInUserFavorites(req)
            } catch(e) {
                var isSuccess = false
            }
            assert.deepEqual(Boolean(isSuccess), false)
        })

        it('Todas as informações enviadas na requisição, porém o id do usuário não é válido', async function(){
            const req = {
                body: {
                    idUser: -35,
                    idLocal: 2
                }
            };

            try {
                var isSuccess = await savedLocalsController.validateAndSaveLocalInUserFavorites(req)
            } catch(e) {
                var isSuccess = false
            }
            assert.deepEqual(Boolean(isSuccess), false)
        })

        it('Todas as informações enviadas na requisição, porém o id do local não é válido', async function(){
            const req = {
                body: {
                    idUser: 3,
                    idLocal: 0
                }
            };

            try {
                var isSuccess = await savedLocalsController.validateAndSaveLocalInUserFavorites(req)
            } catch(e) {
                var isSuccess = false
            }
            assert.deepEqual(Boolean(isSuccess), false)
        })

        it('Todas as informações enviadas na requisição, ambas as informações são válidas, deve retornar com sucesso', async function(){
            const req = {
                body: {
                    idUser: 3,
                    idLocal: 2
                }
            };

            try {
                var isSuccess = await savedLocalsController.validateAndSaveLocalInUserFavorites(req)
            } catch(e) {
                var isSuccess = false
            }
            assert.deepEqual(Boolean(isSuccess), true)
        })
    })
})