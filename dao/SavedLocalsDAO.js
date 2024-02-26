const postgressConnection = require('../utils/DbConnector')
const LocalDTO = require('../model/LocalDTO')

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
                ON CONFLICT DO NOTHING
            `
        }).then(() => {
            
        }).catch(() => {
            console.log("Ocorreu um erro ao salvar o local novo na lista.")
        })
    }

    getAllLocalsSavedByUser = async(data) => {
        var userLocals = []
        await this.postgresSql`
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
            WHERE tb_local_user_saved.id_user = ${data.idUser}
                AND UPPER(tb_week_workday.nm_day) = ${data.weekDay} 
        `.forEach(it => {
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
}

module.exports = SavedLocalsDAO