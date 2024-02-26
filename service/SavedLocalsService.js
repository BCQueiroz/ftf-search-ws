const express = require('express')
const SavedLocalsController = require('../controller/SavedLocalsController')

class SavedLocalsService{

    constructor(){
        this.routes = express.Router()
        this.savedLocalsController = new SavedLocalsController()

        this.routes.get('/save-new-local-by-user', express.json(), this.saveNewLocalByUser.bind(this))
        this.routes.get('/get-locals-saved-by-user', express.json(), this.getLocalsSavedByUser.bind(this))
    }

    saveNewLocalByUser = async(req, res) => {
        try{
            await this.savedLocalsController.saveNewLocalByUser(req)
            res.send({success: true, result: {}, message: "Local salvo com sucesso na lista do usuário."})
        } catch(e) {
            throw Error('')
        }
    }

    getLocalsSavedByUser = async(req, res) => {
        try{
            var localsSaved = await this.savedLocalsController.getLocalsSavedByUser(req)
            res.send({success: true, message: "Lista de locais salvos pelo usuário.", result: {localsSaved: localsSaved}})
        } catch(e) {
            throw Error('')
        }
    }
}

module.exports = SavedLocalsService