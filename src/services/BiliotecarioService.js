import ApiService from '../services/ApiService'

export default class BibliotecarioServices extends ApiService{

    constructor(){
        super('/bibliotecario')
    }

    salvar(bibliotecario){
       return this.post('/',bibliotecario)
    }

    buscarPessoaPorNome(nome){
        return this.get(`/pessoa/nome/${nome}`)
    }
}