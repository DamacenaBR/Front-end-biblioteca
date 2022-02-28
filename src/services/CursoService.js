import ApiService from '../services/ApiService'

export default class CursoServices extends ApiService{

    constructor(){
        super('/curso')
    }

    buscarTodos(){
        return this.get('/all')
    }
}