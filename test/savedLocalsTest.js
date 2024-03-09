const assert = require('assert')
const SavedLocalsController = require('../controller/savedLocalsController')

describe('Testar funções de salvar locais como favoritos e retornar esses locais', function(){
    const savedLocalsController = new SavedLocalsController()

    describe('Testar cenários para salvar novos locais escolhidos pelo usuário', async function(){
        
        it('Falta de informações enviadas pela requisição, faltando tudo', async function(){
            const req = {
                body: {}
            };

            try {
                await savedLocalsController.saveNewLocalByUser(req)
                var isSuccess = true
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
            }

            try {
                await savedLocalsController.saveNewLocalByUser(req)
                var isSuccess = true
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
                await savedLocalsController.saveNewLocalByUser(req)
                var isSuccess = true
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
                await savedLocalsController.saveNewLocalByUser(req)
                var isSuccess = true
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
                await savedLocalsController.saveNewLocalByUser(req)
                var isSuccess = true
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
                await savedLocalsController.saveNewLocalByUser(req)
                var isSuccess = true
            } catch(e) {
                var isSuccess = false
            }
            assert.deepEqual(Boolean(isSuccess), true)
        })
    })

    describe('Testar serviço que retorna os locais salvos', async function(){

        it('Falta de informações enviadas pela requisição, faltando tudo', async function(){
            const req = {
                body: {}
            }; 

            try {
                var result = await savedLocalsController.getLocalsSavedByUser(req)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Informações enviadas na requisição, id do usuario inválido', async function(){
            const req = {
                body: {
                    idUser: 0
                }
            }; 

            try {
                var result = await savedLocalsController.getLocalsSavedByUser(req)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })

        it('Informações enviadas na requisição, id sem problemas, deve retornar com sucesso a lista, seja com valores ou vazia', async function(){
            const req = {
                body: {
                    idUser: 3
                }
            }; 

            try {
                var result = await savedLocalsController.getLocalsSavedByUser(req)
            } catch(e) {
                var result = false
            }
            assert.deepEqual(Boolean(result), true)
        })
    })
})