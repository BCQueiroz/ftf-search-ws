
const assert = require('assert')
const SearchDAO = require('../dao/searchDAO');

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
})