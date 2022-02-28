import ApiService from '../services/ApiService'

export default class BibliotecaServices extends ApiService{

    constructor(){
        super('/biblioteca')
    }

    buscarTodos(){
        return this.get('/all')
    }
}