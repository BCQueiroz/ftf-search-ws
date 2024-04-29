require('dotenv').config()
const localDTO = require('../model/localDTO')
const searchDAO = require('../dao/searchDAO')
const weekDays = require('../utils/WeekDayEnum')
const TagTypeDTO = require('../model/tagTypeDTO')

class SearchController{

    constructor(){
        this.localDTO = new localDTO()
        this.searchDAO = new searchDAO()
    }

    searchLocals = async (req) => {
        const day = new Date().getDay()
        var data = {}
        if(req && req.body) data = req.body
        data.weekDay = weekDays[day]
        
        var finalLocalsList = []
        const localsByParams = await this.searchDAO.getLocalsByParams(data)
        
        if(data.idTagList && data.idTagList.length == 0) {
            finalLocalsList.push(...localsByParams)
            return finalLocalsList
        }

        const localsByTagCountMap = data.idTagList ? await this.searchDAO.getLocalsByTags(data) : new Map()

        localsByParams.forEach(async local => {
            if(localsByTagCountMap.has(local.idLocal) && localsByTagCountMap.get(local.idLocal) == data.idTagList.length){
                finalLocalsList.push(local)
            }
        })

        return finalLocalsList
    }

    getAllTags = async () => {
        var tagInfoList = await this.searchDAO.getAllTags()
        var tagsAggregatedByType = new Map()
        tagInfoList.forEach(it => {
            var tagInfo = {
                idTag : it.idTag,
                dsTag : it.dsTag
            }
            if(tagsAggregatedByType.has(it.idTypeTag)){
                tagsAggregatedByType.get(it.idTypeTag).tagList.push(tagInfo)
            } else {
                var tagTypeInfo = new TagTypeDTO()
                tagTypeInfo.idTypeTag = it.idTypeTag
                tagTypeInfo.dsTypeTag = it.dsTypeTag
                tagTypeInfo.cdColorTypeTag = it.cdColorTypeTag
                tagTypeInfo.tagList = [tagInfo]
                tagsAggregatedByType.set(it.idTypeTag, tagTypeInfo)
            }
        })
        
        return Array.from(tagsAggregatedByType.values())
    }

    getAllCities = async () => {
        return await this.searchDAO.getAllCities()
    }

    getLocalAdditionalInfo = async(data) => {
        var idLocal = data.idLocal
        if(!Boolean(idLocal)) throw Error("Não foi passado id do local desejado na requisição, abortando.")

        var localAdditionalInfo = await this.searchDAO.getLocalAdditionalInfo(idLocal)
        var localAllTags = await this.searchDAO.getAllLocalTags(idLocal)
        var localScheduleWork = await this.searchDAO.getLocalScheduleWork(idLocal)

        localAdditionalInfo.localAllTags = localAllTags
        localAdditionalInfo.localScheduleWork = localScheduleWork

        return localAdditionalInfo
    }
}

module.exports = SearchController
