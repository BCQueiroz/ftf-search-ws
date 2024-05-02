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

    removeItemFromUserSavedLocals = async(req) => {
        var data = {}
        if(req && req.body && req.body.idUser && req.body.idLocal) data = req.body 
        else throw Error("Não foram informadas todas as informações para salvar o local nos favoritos.")

        var userExists = await this.savedLocalsDAO.validateIfUserExists(data.idUser)
        if(!userExists) throw Error('O Usuário informado não existe.')

        var localExists = await this.savedLocalsDAO.validateIfLocalExists(data.idLocal)
        if(!localExists) throw Error('O Local informado não existe.')

        try {
            await this.savedLocalsDAO.removeLocalFromUserList(data)
        } catch(e) {
            throw Error('Ocorreu um erro ao remover o local da lista dos favoritos.')
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
            const result = await this.savedLocalsDAO.getAllLocalsSavedByUser(data)
            var idLocalList = result.map(it => it.idLocal)
            
            const tagsByLocal = await this.savedLocalsDAO.getAllLocalTags(idLocalList)

            result.forEach(async it => {
                it.tagsInfo = tagsByLocal.has(it.idLocal) ? tagsByLocal.get(it.idLocal) : []
            })
            return result
        } catch(e) {
            throw Error('Ocorreu um erro ao realizar a consulta.')
        }
    }

    getIdLocalsSavedByUser = async(idUser) => {
        if(!Boolean(idUser)) return new Set()
        return await this.savedLocalsDAO.getIdLocalsSavedByUser(idUser)
    }
}

module.exports = SavedLocalsController
