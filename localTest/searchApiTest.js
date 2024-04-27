const SearchDAO = require('../dao/searchDAO')

describe("Testando query dos serviços de busca", function(){

    const searchDao = new SearchDAO()
    const idLocal = 23

    describe("Testar query com node-postgres", async function() {
        it("get-all-cities", async function(){
            const result = await searchDao.getAllCitiesV2()
            console.log(result)
        })

        it("get-all-tags", async function() {
            const result = await searchDao.getAllTagsV2()
            console.log(result)
        })

        it("search-locals/getLocalsByTagsV2", async function() {
            var data = {
                idTagList: [1, 2]
            }
            const result = await searchDao.getLocalsByTagsV2(data)
            console.log(result)
        })

        it("search-locals/getLocalsByParamsV2", async function() {
            var data = {
                weekDay: "QUINTA",
                idCity: 2,
                idPeriod: 1
            }
            const result = await searchDao.getLocalsByParamsV2(data)
            console.log(result)
        })

        it("get-local-additional-info/getLocalAdditionalInfoV2", async function() {
            const result = await searchDao.getLocalAdditionalInfoV2(idLocal)
            console.log(result)
        })

        it("get-local-additional-info/getAllLocalTags", async function() {
            const result = await searchDao.getAllLocalTagsV2(idLocal)
            console.log(result)
        })

        it("get-local-additional-info/getLocalScheduleWorkV2", async function() {
            const result = await searchDao.getLocalScheduleWorkV2(idLocal)
            console.log(result)
        })
    })
})