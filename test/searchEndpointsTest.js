
const assert = require('assert')
const SearchDAO = require('../dao/searchDAO')
const SearchController = require('../controller/searchController')

/*
describe('Banco de Dados', function() {
    describe('getAllCities()', function() {
        it('Testar retorno da função getCities()', async function() {
            var cities = await new SearchDAO().getAllCities()

            assert.notDeepEqual(cities, [])
        })
    }),

    describe('getAllTags()', function() {
        it('Testar retorno da função getAllTags()', async function() {
            var tags = await new SearchDAO().getAllTags()

            assert.notDeepEqual(tags, [])
        })
    })

    describe('getLocalAdditionalInfo()- Testar retorno esperado', function() {
        it('Testar retorno válido para a função getLocalAdditionalInfo()', async function() {
            var idLocal = 1
            var localAdditionalInfo = await new SearchDAO().getLocalAdditionalInfo(idLocal)

            assert.deepEqual(Boolean(localAdditionalInfo), true)
        })
    })

    describe('getLocalAdditionalInfo() - Testar retorno com parâmetro faltando', function() {
        it('Testar retorno com parametro invalido para a função getLocalAdditionalInfo()', async function() {
            var result
            try {
                await new SearchController().getLocalAdditionalInfo()
                result = true
            } catch (error) {
                result = false
            }
            assert.deepEqual(Boolean(result), false)
        })
    })

    describe('getLocalsData() - Testar retorno esperado', function(){
        it('Não pode retornar uma lista vazia', async () => {
            const req = {
                body: {
                    idTagList: [1, 2]
                }
            };
    
            const res = {
                send: function(data) {
                }
            };

            var result = []
            try {
                result = await new SearchController().getLocalsData(req, res)
            } catch(e) {
                result = []
            }
            assert.notDeepEqual(result, [])
        })
    })

    describe('getLocalsData() - Testar retorno vazio', function(){
        it('Deve retornar uma lista vazia', async () => {
            const req = {
                body: {
                    idTagList: [13, 21]
                }
            };
    
            const res = {
                send: function(data) {
                    console.log(data)
                }
            };

            var result = []
            try {
                result = await new SearchController().getLocalsData(req, res)
            } catch(e) {
                result = []
            }
            assert.deepEqual(result, [])
        })
    })
})

*/