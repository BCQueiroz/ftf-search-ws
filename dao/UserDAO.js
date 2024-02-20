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

}

module.exports = UserDAO