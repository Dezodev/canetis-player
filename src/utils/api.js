import axios from 'axios'
import _ from 'lodash'

import { PAGINATION_LIMIT } from './constants'

const api_base_url = 'https://at1.api.radio-browser.info/json/'

const _checkCountryCode = (code) => {
    if (!code || code.length !== 2) {
        throw new Error('Invalid country code')
    }
}

const getCountriesQuery = async () => {
    try {
        const resp = await axios.get(api_base_url + 'countries')
        return resp.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

const getCountryQuery = async ({ queryKey }) => {
    const countryCode = queryKey[1]

    // Check if country code is valid (not empty and 2 letters)
    _checkCountryCode(countryCode)

    try {
        const resp = await axios.get(api_base_url + 'countries/' + countryCode)
        return resp.data[0]
    } catch (err) {
        console.error(err)
        throw err
    }
}

const getRadiosByCountryQuery = async ({ queryKey }) => {
    const countryCode = queryKey[1],
        params = queryKey[2]

    console.log('-- getRadiosByCountryQuery >> params: ', {
        countryCode,
        params,
    })

    // Get query params
    const currPage = _.isNumber(params.page) ? params.page : 1,
        currSearch = !_.isEmpty(params.search) ? params.search : null

    console.log('-- getRadiosByCountryQuery >> currPage: ', currPage)
    console.log('-- getRadiosByCountryQuery >> currSearch: ', currSearch)

    // Check if country code is valid (not empty and 2 letters)
    _checkCountryCode(countryCode)

    const limit = PAGINATION_LIMIT.radios
    const offset = (currPage - 1) * limit

    try {
        const queryParams = {
            countrycode: countryCode,
            order: 'votes',
            reverse: true,
            offset: offset,
            limit: limit,
            name: currSearch,
        }

        console.log('-- getRadiosByCountryQuery >> queryParams: ', queryParams)

        const resp = await axios.get(api_base_url + 'stations/search', {
            params: queryParams,
        })

        const count_resp = await axios.get(api_base_url + 'stations/search', {
            params: {
                ...queryParams,
                limit: null,
                offset: null,
            },
        })

        return {
            list: resp.data,
            count: count_resp.data.length,
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

export { getCountriesQuery, getCountryQuery, getRadiosByCountryQuery }
