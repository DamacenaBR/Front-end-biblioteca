import axios from 'axios'


const httpClient = axios.create({
    baseURL:'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
})

export default class EstadoService{

    bucarEstados(){
        return httpClient.get(this.baseURL)
    }
}