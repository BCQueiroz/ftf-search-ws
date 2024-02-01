require('dotenv').config()
const express = require('express')
const postgres = require('postgres')
const localDTO = require('../model/LocalDTO')
const searchDAO = require('../dao/searchDAO')
const weekDays = require('../utils/WeekDayEnum')

class SearchController{

    constructor(){
        this.routes = express.Router()
        this.localDTO = new localDTO()
        this.searchDAO = new searchDAO()
        this.postgressConnection = postgres(process.env.DB_CONNECTION, {})

        this.routes.get('/search-locals', express.json(), this.getLocalsByTag.bind(this))
    }

    async getLocalsByTag(req, res){
        const day = new Date().getDay()
        var data = {}
        if(req && req.body) data = req.body
        data.weekDay = weekDays[day]
        data.idTagList = [1, 2, 3]
        const localsByParams = await this.searchDAO.getLocalsByParams(data, res)
        const localsByTagCountMap = await this.searchDAO.getLocalsByTags(data, res)

        var finalLocalsList = []
        localsByParams.forEach(local => {
            if(localsByTagCountMap.has(local.idLocal) 
                && localsByTagCountMap.get(local.idLocal) == data.idTagList.length){
                finalLocalsList.push(local)
            }
        })

        console.log(finalLocalsList)
        return JSON.stringify(finalLocalsList)
    }
}

module.exports = SearchController