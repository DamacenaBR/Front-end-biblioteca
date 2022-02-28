import axios from 'axios'


const httpClient = axios.create({
    baseURL:'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
})

const municipios = '/municipios'

export default class CidadesService{

    bucarCidadesPorUd(uf){
        return httpClient.get(`${uf}${municipios}`)
    }
}