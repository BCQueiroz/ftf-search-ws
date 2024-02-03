require('dotenv').config()
const express = require('express')
const postgres = require('postgres')
const localDTO = require('../model/LocalDTO')
const searchDAO = require('../dao/searchDAO')
const weekDays = require('../utils/WeekDayEnum')
const TagTypeDTO = require('../model/TagTypeDTO')

class SearchController{

    constructor(){
        this.routes = express.Router()
        this.localDTO = new localDTO()
        this.searchDAO = new searchDAO()
        this.postgressConnection = postgres(process.env.DB_CONNECTION, {})

        this.routes.get('/search-locals', express.json(), this.searchLocals.bind(this))
        this.routes.get('/get-all-tags', express.json(), this.getAllTags.bind(this))
        this.routes.get('/get-all-cities', express.json(), this.getAllCities.bind(this))
        this.routes.get('/get-local-additional-info', express.json(), this.getLocalAdditionalInfo.bind(this))
    }

    searchLocals = async (req, res) => {
        const day = new Date().getDay()
        var data = {}
        if(req && req.body) data = req.body
        data.weekDay = weekDays[day]
        
        const localsByParams = await this.searchDAO.getLocalsByParams(data, res)
        const localsByTagCountMap = data.idTagList ? await this.searchDAO.getLocalsByTags(data, res) : new Map()

        var finalLocalsList = []
        localsByParams.forEach(local => {
            if(localsByTagCountMap.has(local.idLocal) 
                && localsByTagCountMap.get(local.idLocal) == data.idTagList.length){
                finalLocalsList.push(local)
            }
        })

        res.send(finalLocalsList)
    }

    getAllTags = async (req, res) => {
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
        
        res.send(Array.from(tagsAggregatedByType.values()))
    }

    getAllCities = async (req, res) => {
        var cityList = await this.searchDAO.getAllCities()
        res.send(cityList)
    }

    getLocalAdditionalInfo = async(req, res) => {
        var data = req.body
        var idLocal = data.idLocal
        if(!Boolean(idLocal)) throw Error("Não foi passado id do local desejado na requisição, abortando.")

        var localAdditionalInfo = await this.searchDAO.getLocalAdditionalInfo(idLocal)
        var localAllTags = await this.searchDAO.getAllLocalTags(idLocal)
        var localScheduleWork = await this.searchDAO.getLocalScheduleWork(idLocal)

        localAdditionalInfo.localAllTags = localAllTags
        localAdditionalInfo.localScheduleWork = localScheduleWork

        res.send(localAdditionalInfo)
    }
}

module.exports = SearchController