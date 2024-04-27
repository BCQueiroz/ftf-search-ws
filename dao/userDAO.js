const UserInfoDTO = require('../model/userInfoDTO')
const pgManager = require('../utils/PgConnManager')

class UserDAO {

    constructor() {}

    userAlreadyExists = async(dsEmail) => {
        var userExists = false
        var sql = `
            SELECT COUNT(1) AS users 
            FROM tb_user
            WHERE ds_email = $1
        `
        var params = [dsEmail]

        const result = await pgManager.executeQuery(sql, params)

        result.rows.forEach(it => {
            userExists = it.users > 0
        })
        return userExists
    }

    createNewUserAccount = async(data) => {
        var sql = `
            INSERT INTO tb_user(nm_user, dt_birthday, ds_email, cd_password)
            VALUES($1, $2, $3, $4)
        `
        var params = [data.nmUser, data.dtBirthday, data.email, data.password]
        await pgManager.executeQuery(sql, params)
    }

    getUserDataByEmail = async(dsEmail) => {
        var userInfo =  new UserInfoDTO()
        var sql = `
            SELECT id_user,
                    nm_user,
                    dt_birthday,
                    cd_password
            FROM tb_user
            WHERE ds_email = $1
        `
        var params = [dsEmail]
        const result = await pgManager.executeQuery(sql, params)

        result.rows.forEach(it => {
            userInfo.idUser = it.id_user
            userInfo.nmUser = it.nm_user
            userInfo.dtBirthday = it.dt_birthday
            userInfo.password = it.cd_password
        })
        return userInfo
    }

    validateUserIsValid = async(idUser, email) => {
        var isValid = false
        var sql = `
            SELECT EXISTS(
                SELECT 1 FROM tb_user
                WHERE id_user = $1
                    AND ds_email = $2
            ) AS is_valid
        `
        var params = [idUser, email]
        const result = await pgManager.executeQuery(sql, params)

        result.rows.forEach(it => {
            isValid = it.is_valid
        })
        return isValid
    }

    updateUserPassword = async(idUser, hashPassword) => {
        var sql = `
            UPDATE tb_user SET cd_password = $1
            WHERE id_user = $2
        `
        var params = [hashPassword, idUser]
        await pgManager.executeQuery(sql, params)
    }
}

module.exports = UserDAO
