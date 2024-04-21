const express = require('express')
const SavedLocalsController = require('../controller/savedLocalsController')

class SavedLocalsService{

    constructor(){
        this.routes = express.Router()
        this.savedLocalsController = new SavedLocalsController()

        this.routes.post('/save-new-local-by-user', express.json(), this.saveNewLocalByUser.bind(this))
        this.routes.post('/get-locals-saved-by-user', express.json(), this.getLocalsSavedByUser.bind(this))
        this.routes.post('/remove-item-from-saved-locals', express.json(), this.removeItemFromUserSavedLocals.bind(this))
    }

    saveNewLocalByUser = async(req, res) => {
        try {
            await this.savedLocalsController.saveNewLocalByUser(req)
            res.send({success: true, result: {}, message: "Local salvo com sucesso na lista do usuário."})
        } catch(e) {
            res.send({success: false, result: {}, message: "Ocorreu um erro ao salvar o local na lista do usuário."})
        }
    }

    getLocalsSavedByUser = async(req, res) => {
        try {
            var localsSaved = await this.savedLocalsController.getLocalsSavedByUser(req)
            res.send({success: true, message: "Lista de locais salvos pelo usuário.", result: {localsSaved: localsSaved}})
        } catch(e) {
            res.send({success: false, result: {}, message: "Ocorreu um erro ao carregar as informações dos locais salvos."})
        }
    }

    removeItemFromUserSavedLocals = async(req, res) => {
        try {
            await this.savedLocalsController.removeItemFromUserSavedLocals(req)
            res.send({success: true, result: {}, message: "Local removido com sucesso da lista do usuário."})
        } catch(e) {
            res.send({success: false, result: {}, message: "Ocorreu um erro ao deletar o local da lista do usuário."})
        }
    }
}

module.exports = SavedLocalsService
