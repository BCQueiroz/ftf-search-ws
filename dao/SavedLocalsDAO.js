const postgressConnection = require('../utils/DbConnector')

class SavedLocalsDAO {

    constructor(){
        this.postgresSql = postgressConnection.newConection()
    }

    validateIfUserExists = async(idUser) => {
        var userExists = false 
        await this.postgresSql`
            SELECT EXISTS(
                SELECT 1 FROM tb_user WHERE id_user = ${idUser}
            ) AS user_exists
        `.forEach(it => {
            userExists = it.user_exists
        })
        return userExists
    }

    validateIfLocalExists = async(idLocal) => {
        var localExists = false 
        await this.postgresSql`
            SELECT EXISTS(
                SELECT 1 FROM tb_local WHERE id_local = ${idLocal}
            ) AS local_exists
        `.forEach(it => {
            localExists = it.local_exists
        })
        return localExists
    }

    saveNewLocalInUserList = async(data) => {
        await this.postgresSql.begin(async sql => {
            await this.postgresSql`
                INSERT INTO tb_local_user_saved(id_local, id_user)
                VALUES(${data.idLocal}, ${data.idUser})
            `
        }).then(() => {
            console.log("Local salvo com sucesso na lista do usuário.")
        }).catch(() => {
            console.log("Ocorreu um erro ao salvar o local novo na lista.")
        })
    }
}

module.exports = SavedLocalsDAO