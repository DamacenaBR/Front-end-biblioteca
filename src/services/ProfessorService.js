import ApiService from '../services/ApiService'

export default class ProfessorServices extends ApiService{

    constructor(){
        super('/professor')
    }

    salvar(professor){
       return this.post('/',professor)
    }

    buscarProfessorPorID(id){
        return this.get(`/${id}`)

    }

    atualizarProfessor(professor){
        return this.put('/', professor)
    }

    deleteProfessorPorID(id){
        return this.delete(`/${id}`)

    }
}