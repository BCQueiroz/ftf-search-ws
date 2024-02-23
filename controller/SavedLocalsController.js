const express = require('express')
const SavedLocalsDAO = require('../dao/SavedLocalsDAO')

class SavedLocalsController {

    constructor(){
        this.routes = express.Router()
        this.savedLocalsDAO = new SavedLocalsDAO()

        this.routes.get('/save-new-local-by-user', express.json(), this.saveNewLocalByUser.bind(this))
    }

    saveNewLocalByUser = async(req, res) => {
        //validar se dados necessários vieram
        //validar se o idUser existe
        //validar se o idLocal existe
        //salvar os dados no banco

        var data = {}
        if(req && req.body && req.body.idUser && req.body.idLocal) data = req.body 
        else throw Error("Não foram informadas todas as informações para salvar o local nos favoritos.")

        var isSuccess = await this.validateAndSaveLocalInUserFavorites(data)
        if(isSuccess) {
            res.send({success: true, result: {}, message: "Local salvo com sucesso na lista do usuário."})
        } else {
            throw Error('Ocorreu um erro ao salvar o local na lista de favoritos.')
        }
    }

    validateAndSaveLocalInUserFavorites = async(data) => {
        var userExists = await this.savedLocalsDAO.validateIfUserExists(data.idUser)
        if(!userExists) throw Error('O Usuário informado não existe.')

        var localExists = await this.savedLocalsDAO.validateIfLocalExists(data.idLocal)
        if(!localExists) throw Error('O Local informado não existe.')

        try{

        } catch(e){
            
        }
    }

}

module.exports = SavedLocalsController