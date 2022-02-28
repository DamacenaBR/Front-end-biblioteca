import React from 'react'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import NavBar from '../components/NavBar'
import {messageErro, messageSucess} from '../components/Toastr'
import LivroService from '../services/LivrosService'
import BibliotecaServices from '../services/BibliotecaService'

export default class CadastroLivro extends React.Component {

    constructor(){
        super()
        this.livroService = new LivroService()
        this.bibliotecaService = new BibliotecaServices()
    }

    state = {
        id: null,
        nome : '',
        isbn : '',
        area : '',
        quantidade:'',
        bibliotecaID:'',
        bibliotecas: []
    }

    resetForm = () => {
        this.setState({
            nome : '',
            isbn : '',
            area : '',
            quantidade:'',
            bibliotecaID:''
            })
    }

    componentDidMount() {
        this.bibliotecaService.buscarTodos()
            .then(response =>{this.setState({bibliotecas : response.data}) })
            
            const params = this.props.match.params
            if (params.id) {
    
                this.livroService.buscarLivroPorID(params.id)
                    .then(response => {this.setState({ ...response.data })})
                    .catch(error => {messageErro("Erro ao tentar recuperar usuário")})
            }
    }

     save = () => {
       const livro = {
            id :this.state.id,
            nome : this.state.nome,
            isbn : this.state.isbn,
            area : this.state.area,
            quantidade : this.state.quantidade,            
            biblioteca:{
                id: this.state.bibliotecaID
            }
        }

        if(this.state.id == null){
            this.livroService.salvar(livro)
            .then(user => { messageSucess("Usuário cadastrado com sucesso!")})
            .catch(erro => {messageErro("Erro ao realizar o cadastro")})
        }
        else{
            this.livroService.atualizarLivro(livro)
            .then(user => {messageSucess("Usuário atualizado com sucesso!")})
            .catch(erro => {messageErro("Erro ao atualizado o cadastro")})
        }
            
            
    }

    render() {
        const listBibliotecas = this.state.bibliotecas;
        return (
            <>
            <NavBar/>
            <div className="container">
                <div className="row">
                    <div className="col-6" style={{ position: 'relative', left: '300px'}}>
                        <Card titulo="Cadastro Livros">
                            <div className="row">
                                <div className="col-12">
                                    <div className="bs-component">
                                        <fieldset>
                                        <FormGroup htmlFor="inputNOME" label="Nome * :">
                                                <input type="text"
                                                    value={this.state.nome}
                                                    onChange={(e) => this.setState({nome : e.target.value})} 
                                                    className="form-control"
                                                    id="inputNOME"
                                                    aria-describedby="nomeHelp" 
                                                    placeholder="Digite o nome"/>
                                            </FormGroup>

                                            <FormGroup htmlFor="inputISBN" label="ISBN * :">
                                                <input type="text"
                                                    value={this.state.isbn}
                                                    onChange={(e) => this.setState({isbn : e.target.value})}
                                                    className="form-control"
                                                    id="inputISBN"
                                                    aria-describedby="ISBNHelp" 
                                                    placeholder="Digite o ISBN"/>
                                            </FormGroup>
                                            
                                            <FormGroup htmlFor="inputAREA" label="ÁREA * :">
                                                    <div className="form-group">
                                                        <select className="form-control"
                                                            value={this.state.area}
                                                            id="inputAREA"
                                                            onChange={(e) => this.setState({ area: e.target.value })}>
                                                            <option></option>
                                                            <option value="0">Humanas</option>
                                                            <option value="1">Exatas</option>
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                    

                                            <FormGroup htmlFor="inputQUANTIDADE" label="QUANTIDADE * :">
                                                <input type="text"
                                                    value={this.state.quantidade}
                                                    onChange={(e) => this.setState({quantidade: e.target.value})}
                                                    className="form-control"
                                                    id="inputQUANTIDADE"
                                                    aria-describedby="QUANTIDADEHelp" 
                                                    placeholder="Digite a quantidade"/>
                                            </FormGroup>

                                            

                                            <FormGroup htmlFor="inputBIBLIOTECA" label="BIBLIOTECA * :">
                                                <div className="form-group">
                                                    <select className="form-control"
                                                    value={this.state.bibliotecaID}
                                                    id="inputBIBLIOTECA" 
                                                    onChange={(e) => this.setState({bibliotecaID: e.target.value})}>
                                                        <option></option>
                                                            {                                                                
                                                                listBibliotecas.map(biblioteca => (
                                                                    <option key={biblioteca.id} value={biblioteca.id}>{biblioteca.nome}</option>
                                                                ))
                                                            }
                                                    </select>
                                                </div>

                                            </FormGroup>
                                        
                                        </fieldset>
                                    </div>
                                    <button type="button" onClick={this.save} className="btn btn-success mr-2">Salvar</button>
                                    <button type="reset" onClick={this.resetForm} className="btn btn-secondary">Limpar</button>

                                </div>
                            </div>                           
                        </Card>
                    </div>
                </div>
            </div>
            </>
        )
    }
}



