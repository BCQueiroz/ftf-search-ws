const LocalDTO = require('../model/LocalDTO')
const TagInfoDTO = require('../model/TagInfoDTO')
const postgresSql = require('../utils/DbConnector')

class SearchDAO{

    constructor() {
    }

    getLocalsByParams = async (data, res) => {
        let hasOperatingPeriodParam = Boolean(data.idPeriod)
        let hasCityParam = Boolean(data.idCity)
        var locals = []
        
        await postgresSql`
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
                WHERE UPPER(tb_week_workday.nm_day) = ${data.weekDay} 
                ${
                    hasOperatingPeriodParam ? 
                      postgresSql` AND tb_local_operating_period.id_period = ${data.idPeriod} ` 
                    : postgresSql``
                }
                ${
                    hasCityParam ?
                      postgresSql` AND tb_city.id_city = ${data.idCity} `
                    : postgresSql``
                }
            `.forEach(it => {
                let local = new LocalDTO()
                local.idLocal = it.id_local
                local.nmLocal = it.nm_local
                local.nmAddress = it.nm_address
                local.cdNumberAddress = it.cd_number_address
                local.nmCity = it.nm_city
                local.dhBeginDay = it.dh_begin_day
                local.dhEndDay = it.dh_end_day
                locals.push(local)
            })
        return locals
    }

    getLocalsByTags = async (data, res) => {
        var localsMap = new Map()
        await postgresSql`
                SELECT tb_local_tag.id_local
                FROM tb_local_tag
                WHERE id_tag IN ${ postgresSql(data.idTagList) }
        `.forEach(it => {
            if(!localsMap.has(it.id_local)) localsMap.set(it.id_local, 0)
            localsMap.set(it.id_local, localsMap.get(it.id_local) + 1)
        })
        return localsMap
    }

    getAllTags = async () => {
        var tagList = []
        await postgresSql`
                SELECT tb_tag.id_tag,
                       tb_tag.ds_tag,
                       tb_type_tag.id_type_tag,
                       tb_type_tag.ds_type_tag,
                       tb_type_tag.cd_color_type_tag
                FROM tb_tag
                INNER JOIN tb_type_tag
                    ON tb_tag.id_type_tag = tb_type_tag.id_type_tag  
        `.forEach(it => {
            var tagInfo = new TagInfoDTO() 
            tagInfo.idTag = it.id_tag
            tagInfo.dsTag = it.ds_tag
            tagInfo.idTypeTag = it.id_type_tag
            tagInfo.dsTypeTag = it.ds_type_tag
            tagInfo.cdColorTypeTag = it.cd_color_type_tag
            tagList.push(tagInfo)
        })
        return tagList
    }
}

module.exports = SearchDAO