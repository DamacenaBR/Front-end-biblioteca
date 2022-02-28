import ApiService from "./ApiService";


export default class  LivroService extends ApiService{

    constructor(){
        super('/livro')
    }

    buscarTodos(){
        return this.get('/all')
    }

    salvar(livro){
        return this.post('/',livro)
     }
 
     buscarLivroPorID(id){
         return this.get(`/${id}`)
 
     }

     buscarLivroPelaArea(nome){
         return this.get(`/nome/${nome}`)
     }

     buscarLivroPorISBN(isbn){
        return this.get(`/isbn/${isbn}`)

    }
 
     atualizarLivro(livro){
         return this.put('/', livro)
     }

     deleteLivroPorID(id){
        return this.delete(`/${id}`)

    }
    
}