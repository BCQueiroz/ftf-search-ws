const LocalDTO = require('../model/localDTO')
const pgManager = require('../utils/PgConnManager')

class SavedLocalsDAO {

    constructor(){}

    validateIfUserExists = async(idUser) => {
        var userExists = false
        var sql = `
            SELECT EXISTS(
                SELECT 1 FROM tb_user WHERE id_user = $1
            ) AS user_exists
        `
        var params = [idUser]
        const result = await pgManager.executeQuery(sql, params)

        result.rows.forEach(it => {
            userExists = it.user_exists
        })
        return userExists
    }

    validateIfLocalExists = async(idLocal) => {
        var localExists = false
        var sql = `
            SELECT EXISTS(
                SELECT 1 FROM tb_local WHERE id_local = $1
            ) AS local_exists
        `
        var params = [idLocal]
        const result = await pgManager.executeQuery(sql, params)

        result.rows.forEach(it => {
            localExists = it.local_exists
        })
        return localExists
    }

    saveNewLocalInUserList = async(data) => {
        var sql = `
            INSERT INTO tb_local_user_saved(id_local, id_user)
            VALUES($1, $2)
            ON CONFLICT DO NOTHING
        `
        var params = [data.idLocal, data.idUser]
        pgManager.executeQuery(sql, params)
    }

    removeLocalFromUserList = async(data) => {
        var sql = `
            DELETE FROM tb_local_user_saved
            WHERE id_local = $1
                AND id_user = $2
        `
        var params = [data.idLocal, data.idUser]
        pgManager.executeQuery(sql, params)
    }

    getAllLocalsSavedByUser = async(data) => {
        var userLocals = []
        var sql = `
            SELECT tb_local.id_local,
                    tb_local.nm_local, 
                    tb_address.nm_address, 
                    tb_local.cd_number_address, 
                    tb_city.nm_city, 
                    tb_local_week_workday.dh_begin_day,
                    tb_local_week_workday.dh_end_day 
            FROM tb_local_user_saved
            INNER JOIN tb_local
                ON tb_local_user_saved.id_local = tb_local.id_local
            INNER JOIN tb_local_week_workday
                ON tb_local.id_local = tb_local_week_workday.id_local
            INNER JOIN tb_week_workday
                ON tb_local_week_workday.id_day = tb_week_workday.id_day 
            INNER JOIN tb_address
                ON tb_local.id_address = tb_address.id_address 
            INNER JOIN tb_city 
                ON tb_address.id_city = tb_city.id_city
            WHERE tb_local_user_saved.id_user = $1
                AND UPPER(tb_week_workday.nm_day) = $2
        `
        var params = [data.idUser, data.weekDay]
        const result = await pgManager.executeQuery(sql, params)

        result.rows.forEach(it => {
            let local = new LocalDTO()
            local.idLocal = it.id_local
            local.nmLocal = it.nm_local
            local.nmAddress = it.nm_address
            local.cdNumberAddress = it.cd_number_address
            local.nmCity = it.nm_city
            local.dhBeginDay = it.dh_begin_day
            local.dhEndDay = it.dh_end_day
            userLocals.push(local)
        })
        return userLocals
    }

    validateIfLocalIsSaved = async(idUser, idLocal) => {
        var isSaved = false 
        var sql = `
            SELECT EXISTS(
                SELECT 1 FROM tb_local_user_saved 
                WHERE id_user = $1 AND id_local = $2 
            ) AS local_exists
        `
        var params = [idUser, idLocal]
        const result = await pgManager.executeQuery(sql, params)

        result.rows.forEach(it => {
            isSaved = it.local_exists
        })
        return isSaved
    }
}

module.exports = SavedLocalsDAO
