const LocalDTO = require('../model/LocalDTO')
const postgresSql = require('../utils/db')

class SearchDAO{

    constructor() {
    }

    getLocalsByTags = async (req, res) => {
        let hasOperatingPeriodParam = Boolean(req.id_period)
        
        const data = await postgresSql`
                SELECT tb_local.id_local,
                      tb_local.nm_local, 
                      tb_address.nm_address, 
                      tb_local.cd_number_address, 
                      tb_city.nm_city, 
                      tb_local_week_workday.dh_begin_day,
                      tb_local_week_workday.dh_end_day 
                FROM tb_local ${
                    hasOperatingPeriodParam
                        ? postgresSql` INNER JOIN tb_local_operating_period
                            ON tb_local.id_local = tb_local_operating_period.id_local `
                        : postgresSql``
                }
                INNER JOIN tb_local_week_workday
                    ON tb_local.id_local = tb_local_week_workday.id_local
                INNER JOIN tb_week_workday
                    ON tb_local_week_workday.id_day = tb_week_workday.id_day 
                INNER JOIN tb_address
                    ON tb_local.id_address = tb_address.id_address 
                INNER JOIN tb_city 
                    ON tb_address.id_city = tb_city.id_city
                WHERE UPPER(tb_week_workday.nm_day) = ${req.weekDay} 
                ${
                    hasOperatingPeriodParam ? 
                      postgresSql` AND tb_local_operating_period.id_period = ${req.id_period} ` 
                    : postgresSql``
                }
            `
        res.json(data)
    }
}

module.exports = SearchDAO