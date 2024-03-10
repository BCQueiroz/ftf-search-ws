
const assert = require('assert')
const SearchController = require('../controller/searchController')

describe('Testes com serviços que retornam dados para a tela de pesquisa de locais', function() {

    const searchController = new SearchController()

    describe('getAllCities()', function() {
        it('Testar retorno da função getCities()', async function() {
            try{
                var cities = await searchController.getAllCities()
            } catch(e) {
                var cities = []
            }
            assert.notDeepEqual(cities, [])
        })
    }),

    describe('getAllTags()', function() {
        it('Testar retorno da função getAllTags()', async function() {
            try{
                var tags = await searchController.getAllTags()
            } catch(e) {
                var tags = []
            }

            assert.notDeepEqual(tags, [])
        })
    })

    describe('getLocalAdditionalInfo()- Testar retorno esperado', function() {
        it('Testar retorno válido para a função getLocalAdditionalInfo()', async function() {
            var req = {
                body : {
                    idLocal: 1
                }
            }
            var localAdditionalInfo = await searchController.getLocalAdditionalInfo(req)

            assert.deepEqual(Boolean(localAdditionalInfo), true)
        })

        it('Testar retorno com parametro invalido para a função getLocalAdditionalInfo()', async function() {
            var req = {
                body : {}
            }
            try {
                var result = await searchController.getLocalAdditionalInfo(req)
            } catch (error) {
                var result = false
            }
            assert.deepEqual(Boolean(result), false)
        })
    })

    describe('searchLocals() - Testar retorno esperado', function(){
        it('Não pode retornar uma lista vazia', async () => {
            const req = {
                body: {
                    idTagList: [1, 2]
                }
            };

            try {
                var result = await searchController.searchLocals(req)
            } catch(e) {
                var result = []
            }
            assert.deepEqual(result.length > 0, true)
        })

        it('Deve retornar uma lista vazia', async () => {
            const req = {
                body: {
                    idTagList: [13, 21]
                }
            };

            try {
                var result = await searchController.searchLocals(req)
            } catch(e) {
                var result = []
            }
            assert.deepEqual(result.length, 0)
        })
    })
})