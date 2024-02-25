const express = require('express')
const SavedLocalsDAO = require('../dao/SavedLocalsDAO')

class SavedLocalsController {

    constructor(){
        this.routes = express.Router()
        this.savedLocalsDAO = new SavedLocalsDAO()

        this.routes.get('/save-new-local-by-user', express.json(), this.saveNewLocalByUser.bind(this))
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

}

module.exports = SavedLocalsController