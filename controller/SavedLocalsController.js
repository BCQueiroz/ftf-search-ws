const express = require('express')
const weekDays = require('../utils/WeekDayEnum')
const SavedLocalsDAO = require('../dao/SavedLocalsDAO')

class SavedLocalsController {

    constructor(){
        this.routes = express.Router()
        this.savedLocalsDAO = new SavedLocalsDAO()

        this.routes.get('/save-new-local-by-user', express.json(), this.saveNewLocalByUser.bind(this))
        this.routes.get('/get-locals-saved-by-user', express.json(), this.getLocalsSavedByUser.bind(this))
    }

    saveNewLocalByUser = async(req, res) => {
        var isSuccess = await this.validateAndSaveLocalInUserFavorites(req)

        if(isSuccess) {
            res.send({success: true, result: {}, message: "Local salvo com sucesso na lista do usuário."})
        } else {
            throw Error('Ocorreu um erro ao salvar o local na lista de favoritos.')
        }
    }

    validateAndSaveLocalInUserFavorites = async(req) => {
        var data = {}
        if(req && req.body && req.body.idUser && req.body.idLocal) data = req.body 
        else throw Error("Não foram informadas todas as informações para salvar o local nos favoritos.")

        var userExists = await this.savedLocalsDAO.validateIfUserExists(data.idUser)
        if(!userExists) throw Error('O Usuário informado não existe.')

        var localExists = await this.savedLocalsDAO.validateIfLocalExists(data.idLocal)
        if(!localExists) throw Error('O Local informado não existe.')

        try{
            await this.savedLocalsDAO.saveNewLocalInUserList(data)
            return true
        } catch(e){
            return false
        }
    }

    getLocalsSavedByUser = async(req, res) => {
        try{
            var allLocals = await this.validateAndGetLocalsByIdUser(req)
            res.send({success: true, result: {locals: allLocals}, message: "Lista de locais salvos pelo usuário."})
        } catch(e) {
            throw Error('Ocorreu um erro ao consultar a lista de locais salvos do usuário.')
        }
    }

    validateAndGetLocalsByIdUser = async(req) => {
        var data = {}
        if(req && req.body && req.body.idUser) data = req.body 
        else throw Error("Não foram informadas todas as informações para execução do serviço.")

        var userExists = await this.savedLocalsDAO.validateIfUserExists(data.idUser)
        if(!userExists) throw Error('O Usuário informado não existe.')

        const day = new Date().getDay()
        data.weekDay = weekDays[day]

        try{
            return await this.savedLocalsDAO.getAllLocalsSavedByUser(data)
        } catch(e) {
            throw Error('Ocorreu um erro ao realizar a consulta.')
        }
    }

}

module.exports = SavedLocalsController