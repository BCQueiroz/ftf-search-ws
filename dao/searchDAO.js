const LocalDTO = require('../model/localDTO')
const TagInfoDTO = require('../model/tagInfoDTO')
const CityDTO = require('../model/cityDTO')
const postgressConnection = require('../utils/DbConnector')
const LocalAdditionalInfoDTO = require('../model/localAdditionalInfoDTO')
const LocalScheduleDTO = require('../model/localScheduleDTO')

class SearchDAO{

    constructor() {
        this.postgresSql = postgressConnection.newConection()
    }

    getLocalsByParams = async (data) => {
        let hasOperatingPeriodParam = Boolean(data.idPeriod)
        let hasCityParam = Boolean(data.idCity)
        var locals = []
        
        await this.postgresSql`
                SELECT tb_local.id_local,
                      tb_local.nm_local, 
                      (tb_address.nm_address || ', ' || tb_local.cd_number_address || ', ' || tb_address.ds_neighborhood) AS nm_address, 
                      tb_local.cd_number_address, 
                      tb_city.nm_city, 
                      tb_local_week_workday.dh_begin_day,
                      tb_local_week_workday.dh_end_day 
                FROM tb_local ${
                    hasOperatingPeriodParam
                        ? this.postgresSql` INNER JOIN tb_local_operating_period
                            ON tb_local.id_local = tb_local_operating_period.id_local `
                        : this.postgresSql``
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
                      this.postgresSql` AND tb_local_operating_period.id_period = ${data.idPeriod} ` 
                    : this.postgresSql``
                }
                ${
                    hasCityParam ?
                      this.postgresSql` AND tb_city.id_city = ${data.idCity} `
                    : this.postgresSql``
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

    getLocalsByTags = async (data) => {
        var localsMap = new Map()
        await this.postgresSql`
                SELECT tb_local_tag.id_local
                FROM tb_local_tag
                WHERE id_tag IN ${ this.postgresSql(data.idTagList) }
        `.forEach(it => {
            if(!localsMap.has(it.id_local)) localsMap.set(it.id_local, 0)
            localsMap.set(it.id_local, localsMap.get(it.id_local) + 1)
        })
        return localsMap
    }

    getAllTags = async () => {
        var tagList = []
        await this.postgresSql`
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

    getAllCities = async () => {
        var cityList = []
        await this.postgresSql`
                SELECT tb_city.id_city,
                       tb_city.nm_city,
                       tb_state.cd_acronym
                FROM tb_city
                INNER JOIN tb_state
                    ON tb_city.id_state = tb_state.id_state 
        `.forEach(it => {
            var cityInfo = new CityDTO()
            cityInfo.idCity = it.id_city
            cityInfo.nmCity = it.nm_city
            cityInfo.cdAcronym = it.cd_acronym
            cityList.push(cityInfo)
        })
        return cityList
    }

    getLocalAdditionalInfo = async (idLocal) => {
        var localData = new LocalAdditionalInfoDTO()
        await this.postgresSql`
                SELECT tb_local.nm_local,
                       COALESCE(tb_local.ds_local, '') AS ds_local,
                       tb_local.ds_phone,
                       COALESCE(tb_local.ds_site, '') AS ds_site,
                       (tb_address.nm_address || ', ' || tb_local.cd_number_address || ', ' || tb_address.ds_neighborhood) AS ds_address_complement,
                       COALESCE(tb_local.vl_min_price_aprox, 0) AS vl_min_price_aprox,
                       COALESCE(tb_local.vl_max_price_aprox, 0) AS vl_max_price_aprox
                FROM tb_local
                INNER JOIN tb_address
                    ON tb_local.id_address = tb_address.id_address 
                WHERE id_local = ${idLocal} 
        `.forEach(it => {
            localData.nmLocal = it.nm_local
            localData.dsLocal = it.ds_local
            localData.dsPhone = it.ds_phone
            localData.dsSite = it.ds_site
            localData.dsAddressComplement = it.ds_address_complement
            localData.vlMinPriceAprox = it.vl_min_price_aprox
            localData.vlMaxPriceAprox = it.vl_max_price_aprox
        })
        return localData
    }

    getAllLocalTags = async (idLocal) => {
        var tagList = []
        await this.postgresSql`
                SELECT tb_tag.id_tag,
                       tb_tag.ds_tag,
                       tb_type_tag.id_type_tag,
                       tb_type_tag.ds_type_tag,
                       tb_type_tag.cd_color_type_tag
                FROM tb_local_tag
                INNER JOIN tb_tag
                    ON tb_local_tag.id_tag = tb_tag.id_tag
                INNER JOIN tb_type_tag
                    ON tb_tag.id_type_tag = tb_type_tag.id_type_tag
                WHERE tb_local_tag.id_local = ${idLocal}
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

    getLocalScheduleWork = async (idLocal) => {
        var localScheduleWorkList = []
        await this.postgresSql`
                SELECT tb_week_workday.nm_day,
                       tb_local_week_workday.dh_begin_day,
                       tb_local_week_workday.dh_end_day
                FROM tb_local_week_workday
                INNER JOIN tb_week_workday
                    ON tb_local_week_workday.id_day = tb_week_workday.id_day
                WHERE tb_local_week_workday.id_local = ${idLocal}
        `.forEach(it => {
            var localScheduleWork = new LocalScheduleDTO()
            localScheduleWork.nmDay = it.nm_day
            localScheduleWork.dhBeginDay = it.dh_begin_day
            localScheduleWork.dhEndDay = it.dh_end_day
            localScheduleWorkList.push(localScheduleWork)
        })
        return localScheduleWorkList
    }
}

module.exports = SearchDAO
