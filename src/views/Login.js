import React from 'react'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import PessoaService from '../services/PessoaService'
import LocalStorageService from '../services/LocalStorage'
import NavBar from '../components/NavBar'
import {messageErro} from '../components/Toastr'

export default class Login extends React.Component {

    constructor(){
        super()
         this.PessoaService = new PessoaService()
    }

    state = {
        matricula : '',
        senha : ''
    }

    resetForm = () => {
        this.setState({matricula:'',senha:''})
    }

    login = () =>{
        this.PessoaService.autenticacao({
            matricula : this.state.matricula,
            senha : this.state.senha
        }).then(response => {
            LocalStorageService.addItem('usuario_logado',JSON.stringify(response.data))
            this.props.history.push('/home')
        }).catch(erro =>{
            messageErro("Login ou senha inválidos!")
        })
    }

    render() {
        return (
            <>
            <NavBar/>
            <div className="container">
                <div className="row">
                    <div className="col-6" style={{ position: 'relative', left: '300px'}}>
                        <Card titulo="Login">
                            <div className="row">
                                <div className="col-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup htmlFor="inputMATRICULA" label="Matricula * :">
                                                <input type="email"
                                                    value={this.state.matricula}
                                                    onChange={(e) => this.setState({matricula : e.target.value})} 
                                                    className="form-control"
                                                    id="inputMATRICULA"
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite o matricula"/>
                                            </FormGroup>

                                            <FormGroup htmlFor="inputSenha" label="Senha * :">
                                                <input type="password"
                                                    value={this.state.senha}
                                                    onChange={(e) => this.setState({senha : e.target.value})} 
                                                    className="form-control"
                                                    id="inputSenha"
                                                    aria-describedby="senhaHelp" 
                                                    placeholder="Digite a senha"/>
                                            </FormGroup>
                                        </fieldset>
                                    </div>
                                    <button type="button" onClick={this.login} className="btn btn-success mr-2">Entrar</button>
                                    <button type="reset" onClick={this.resetForm} className="btn btn-secondary">Cancelar</button>

                                    <div className="mt-5">
                                        <button type="button"className="btn btn-info btn-sm btn-block">Quero mim cadastrar</button>
                                    </div>

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



