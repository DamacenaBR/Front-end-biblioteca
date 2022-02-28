import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})

export default class ApiService{

    constructor(apiUrl){
        this.apiUrl = apiUrl
    }

    get(url, params){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.get(requestUrl,params)
    }

    post(url, params){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.post(requestUrl,params)
    }

    put(url, params){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.put(requestUrl,params)
    }

    delete(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.delete(requestUrl)
    }

}