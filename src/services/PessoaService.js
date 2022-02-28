import ApiService from "./ApiService";


export default class  PessoaService extends ApiService{

    constructor(){
        super('/pessoa')
    }

    autenticacao(params){
        return this.get(`/login/${params.matricula}/${params.senha}`)
    }

    buscarTodos(){
        return this.get('/all')
    }
    
}