const express = require('express')
const SearchController = require('../controller/searchController')

class searchService {

    constructor(){
        this.routes = express.Router()
        this.searchController = new SearchController()

        this.routes.get('/search-locals', express.json(), this.searchLocals.bind(this))
        this.routes.get('/get-all-tags', express.json(), this.getAllTags.bind(this))
        this.routes.get('/get-all-cities', express.json(), this.getAllCities.bind(this))
        this.routes.get('/get-local-additional-info', express.json(), this.getLocalAdditionalInfo.bind(this))
    }

    searchLocals = async(req, res) => {
        try{
            var locals = await this.searchController.searchLocals(req)
            res.send({success: true, message: "Locais retornados com sucesso.", result: {locals: locals}})
            //return {success: true, message: "Locais retornados com sucesso.", result: {locals: locals}}
        } catch(e) {
            throw Error('Ocorreu um erro ao procurar locais.')
        }
        
    }

    getAllTags = async(req, res) => {
        try{
            var tags = await this.searchController.getAllTags()
            res.send({success: true, message: "Tags retornadas com sucesso.", result: {tags: tags}})
            //return {success: true, message: "Tags retornadas com sucesso.", result: {tags: tags}}
        } catch(e) {
            throw Error('Ocorreu um erro ao retornar as tags.')
        }
    }

    getAllCities = async(req, res) => {
        try{
            var cities = await this.searchController.getAllCities()
            res.send({success: true, message: "Cidades retornadas com sucesso.", result: {cities: cities}})
            //return {success: true, message: "Cidades retornadas com sucesso.", result: {cities: cities}}
        } catch(e) {
            throw Error('Ocorreu um erro ao retornar as cidades.')
        }
    }

    getLocalAdditionalInfo = async(req, res) => {
        try{
            var localAdditionalInfo = await this.searchController.getLocalAdditionalInfo(req)
            res.send({success: true, message: "Informação adicional retornada com sucesso.", result: {localAdditionalInfo: localAdditionalInfo}})
            //return {success: true, message: "Informação adicional retornada com sucesso.", result: {localAdditionalInfo: localAdditionalInfo}}
        } catch(e) {
            throw Error('Ocorreu um erro ao consultar informações.')
        }
    }
}

module.exports = searchService
