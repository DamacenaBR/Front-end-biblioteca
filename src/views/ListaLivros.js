import React from 'react'
import NavBar from '../components/NavBar'
import LivroService from '../services/LivrosService'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { messageErro, messageSucess } from '../components/Toastr'

export default class ListaLivros extends React.Component{

    constructor(){
        super()
        this.livroService = new LivroService()
    }

    state = {
        livros : [],
        livroDeletar:''
    }

    prepareCadastroLivros = () => {
        this.props.history.push("/CadastroLivros")
    }

    prepareExcluir = (livro) => {
        this.setState({renderDialogFooter:true,livroDeletar:livro})
    }

    confirmeCancelar = () => {
        this.setState({renderDialogFooter:false,livroDeletar:{}})
    }

    excluir = () => {

            this.livroService.deleteLivroPorID(this.state.livroDeletar.id)
            .then(response => {
                const listLivro = this.state.livros
                const index = listLivro.indexOf(this.state.livroDeletar)
                listLivro.splice(index,1)
                this.setState({
                    livros:listLivro
                })
                messageSucess("Livro excluido com sucesso!")
                this.confirmeCancelar()
            })
            .catch(erro => {
                messageErro("Erro ao excluir o livro")
            })
        
        
    }


    componentDidMount(){
        this.livroService.buscarTodos()
        .then(response =>{
            this.setState({livros : response.data})
        })
    }

    prepareEditar = (livro) => {
        this.props.history.push(`/CadastroLivros/${livro.id}`)
    }


    render(){

        const livros = this.state.livros;

        const dialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" className="p-button-success" onClick={this.excluir} />
                <Button label="Não" icon="pi pi-times" className="p-button-danger" onClick={this.confirmeCancelar} />
            </div>
        )

        return(
        <>

            <Dialog 
                header="Confirma Exclusão" 
                footer={dialogFooter} 
                visible={this.state.renderDialogFooter} 
                style={{width: '50vw'}} 
                modal 
                onHide={(e) => this.setState({renderDialogFooter:false})}>
                    Confirma a exlusão do livro?
            </Dialog>

            <NavBar/>

            <div className="container">

            <button type="button" onClick={this.prepareCadastroLivros} className="btn btn-primary mr-3">Cadastrar Livro</button>

                <table className="table table-hover mt-5">
                    <thead>
                        <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">ISBN</th>                        
                        <th scope="col">Área</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        livros.map(livro => (
                            <tr key={livro.id}>
                                <td>{livro.nome}</td>
                                <td>{livro.isbn}</td>
                                <td>{livro.area}</td>
                                <td>{livro.quantidade}</td>
                                <td>
                                    <button type="button" onClick={(e) => this.prepareEditar(livro)} className="btn btn-secondary">editar</button>
                                    <a> </a>
                                    <button type="button" onClick={(e) => this.prepareExcluir(livro)} className="btn btn-danger">excluir</button>
                                </td>
                                
                            </tr>
                        ))
                        }
                        
                    </tbody>
                </table>
            </div>
            
        </>
        )
    }
}