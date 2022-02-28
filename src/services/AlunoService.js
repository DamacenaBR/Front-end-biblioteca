import ApiService from '../services/ApiService'

export default class AlunoServices extends ApiService{

    constructor(){
        super('/aluno')
    }

    salvar(aluno){
       return this.post('/',aluno)
    }

    buscarAlunoPorID(id){
        return this.get(`/${id}`)

    }

    atualizarAluno(aluno){
        return this.put('/', aluno)
    }

    deleteAlunoPorID(id){
        return this.delete(`/${id}`)

    }
}