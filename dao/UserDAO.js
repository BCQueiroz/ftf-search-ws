const UserInfoDTO = require('../model/UserInfoDTO')
const postgressConnection = require('../utils/DbConnector')

class UserDAO {

    constructor() {
        this.postgresSql = postgressConnection.newConection()
    }

    userAlreadyExists = async(dsEmail) => {
        var userExists = false
        await this.postgresSql`
            SELECT COUNT(1) AS users 
            FROM tb_user
            WHERE ds_email = ${dsEmail}
        `.forEach(it => {
            userExists = it.users > 0
        })
        return userExists
    }

    createNewUserAccount = async(data) => {
        await this.postgresSql.begin(async sql => {
            await this.postgresSql`
                INSERT INTO tb_user(nm_user, dt_birthday, ds_email, cd_password)
                VALUES(${data.nmUser}, ${data.dtBirthday}, ${data.email}, ${data.password})
            `
        }).then(() => {
            console.log("Usuário inserido com sucesso.")
        }).catch(()=> {
            console.log("Erro ao inserir usuário.")
        })
    }

    getUserDataByEmail = async(dsEmail) => {
        var userInfo =  new UserInfoDTO()
        await this.postgresSql`
            SELECT id_user,
                    nm_user,
                    dt_birthday,
                    cd_password
            FROM tb_user
            WHERE ds_email = ${dsEmail}
        `.forEach(it => {
            userInfo.idUser = it.id_user
            userInfo.nmUser = it.nm_user
            userInfo.dtBirthday = it.dt_birthday
            userInfo.password = it.cd_password
        })
        return userInfo
    }

}

module.exports = UserDAO