const weekDays = require('../utils/WeekDayEnum')
const SavedLocalsDAO = require('../dao/savedLocalsDAO')

class SavedLocalsController {

    constructor(){
        this.savedLocalsDAO = new SavedLocalsDAO()
    }

    saveNewLocalByUser = async(req) => {
        var data = {}
        if(req && req.body && req.body.idUser && req.body.idLocal) data = req.body 
        else throw Error("Não foram informadas todas as informações para salvar o local nos favoritos.")

        var userExists = await this.savedLocalsDAO.validateIfUserExists(data.idUser)
        if(!userExists) throw Error('O Usuário informado não existe.')

        var localExists = await this.savedLocalsDAO.validateIfLocalExists(data.idLocal)
        if(!localExists) throw Error('O Local informado não existe.')

        try{
            await this.savedLocalsDAO.saveNewLocalInUserList(data)
        } catch(e){
            throw Error('Ocorreu um erro ao salvar o local na lista de favoritos.')
        }
    }

    getLocalsSavedByUser = async(req) => {
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