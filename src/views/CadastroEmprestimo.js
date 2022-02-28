import React from 'react'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import NavBar from '../components/NavBar'
import BibliotecarioService from '../services/BiliotecarioService'
import LivroService from '../services/LivrosService'
import { messageErro, messageSucess } from '../components/Toastr'

export default class CadastroEmprestimo extends React.Component {

    constructor() {
        super()
        this.bibliotecarioService = new BibliotecarioService()
        this.livroService = new LivroService()
    }

    state = {
        nomeUsuario: '',
        usuario: '',
        isbn: '',
        livro: '',
        livrosEmprestimos: []
    }

    consulta = () => {
        this.bibliotecarioService.buscarPessoaPorNome(this.state.nomeUsuario)
            .then(response => {
                this.setState({ usuario: response.data })
                console.log("Pessoa: ", response.data)
            })
            .catch(erro => {
                messageErro("Erro ao encontrar usuario")
            })
    }

    buscarLivroISBN = () => {

        this.livroService.buscarLivroPorISBN(this.state.isbn)
            .then(response => {
                this.setState({ livro: response.data })
                //console.log("Livro: ", response.data)
            })
            .catch(erro => {
                messageErro("Erro ao encontrar o livro")
            })
    }

    adicionarLivros = (livro) => {
        const itemLivro = {
            id: livro.id,
            nome: livro.nome
        }

        const livroEmprestimos = this.state.livrosEmprestimos
        if (livroEmprestimos.length < 3) {
            if (!livroEmprestimos.includes(itemLivro)) {
                this.state.livrosEmprestimos.push(itemLivro)
            }
            else {
                messageErro("Erro ao adicionar livro")
            }
        }
        else {
            messageErro("Não é possivel adicionar outro livro!")
        }
        console.log("Livro: ", this.state.livrosEmprestimos)
        this.resetValues()
    }

    resetValues() {
        this.setState({ isbn: '', livro: '' })
    }

    excluir = (livro) => {
        const livroEmprestimo = this.state.livrosEmprestimos
        const index = livroEmprestimo.indexOf(livro)
        livroEmprestimo.splice(index, 1)
        this.setState(livroEmprestimo)
    }


    render() {

        const livro = this.state.livro
        const livroEmprestimo = this.state.livrosEmprestimos

        return (

            <>
                <NavBar />
                <div className="container">

                    

                    <Card titulo="Cadastro Emprestimo">
                        <FormGroup htmlFor="inputNome" label="Nome * :">
                            <input type="email"
                                value={this.state.nomeUsuario}
                                onChange={(e) => this.setState({ nomeUsuario: e.target.value })}
                                className="form-control"
                                id="inputNOME"
                                aria-describedby="nomeHelp"
                                placeholder="Digite o nome" />
                        </FormGroup>
                    </Card>

                    <div className="mt-2">
                        <button type="button" onClick={this.consulta} className="btn btn-success mr-2">Pesquisar</button>
                    </div>

                </div>

                <div className="container mt-2">
                    <div className="alert alert-dismissible alert-primary">
                        <strong><h3>Consulta</h3></strong>
                    </div>

                    <div className="alert alert-dismissible alert-light">
                        <h4>Usuario: <strong>{this.state.usuario.nome}</strong></h4>
                    </div>

                    <div className="form-group row">
                        <div className="col-6">
                            <Card titulo="Consultar Livros">
                                <FormGroup htmlFor="inputNome" label="ISBN * :">
                                    <input type="email"
                                        value={this.state.isbn}
                                        onChange={(e) => this.setState({ isbn: e.target.value })}
                                        className="form-control"
                                        id="inputNOME"
                                        aria-describedby="nomeHelp"
                                        placeholder="Digite o isbn" />
                                </FormGroup>
                            </Card>
                            <div className="mt-2">
                                <button type="button" onClick={this.buscarLivroISBN} className="btn btn-success mr-2">Pesquisar</button>
                            </div>
                        </div>

                        <div className="col-6">

                            <div className="alert alert-dismissible alert-success">
                                <strong><h3>Lista de Livros</h3></strong>
                            </div>

                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        livroEmprestimo.map(livroL => (
                                            <tr key={livroL.id}>
                                                <td>{livroL.id}</td>
                                                <td>{livroL.nome}</td>
                                                <td>
                                                    <button type="button" onClick={(e) => this.excluir(livroL)} className="btn btn-danger">excluir</button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>



                        </div>
                    </div>


                    <table className="table table-hover">
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
                            <tr key={this.state.livro.id}>
                                <td>{this.state.livro.nome}</td>
                                <td>{this.state.livro.isbn}</td>
                                <td>{this.state.livro.area}</td>
                                <td>{this.state.livro.quantidade}</td>
                                <td>
                                    {
                                        this.state.livro.id != null ? <button type="button" onClick={(e) => this.adicionarLivros(livro)} className="btn btn-success">adicionar</button>
                                            : null
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

}