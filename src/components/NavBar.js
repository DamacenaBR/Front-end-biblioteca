import React from 'react'
import NavItem from '../components/NavItens'
import LocalStorageService from '../services/LocalStorage'
import DropDown from '../components/DropDown'
import DropDownItem from './DropDownItem'

export default class NavBar extends React.Component {
    
    state = {
        usuario : ''
    }

    componentDidMount(){
        const user = JSON.parse(LocalStorageService.getItem('usuario_logado'))
        this.setState({usuario:user})
    }

    isBibliotecario(){
        return this.state.usuario.perfil === 'bibliotecario'
    }

    isAluno(){
        return this.state.usuario.perfil === 'aluno'
    }

    isProfessor(){
        return this.state.usuario.perfil === 'professor'
    }

    isNotNull(){
        return this.state.usuario !== null
    }

    isBibliotecarioAndNotNull(){
        if(this.isNotNull() && this.isBibliotecario()){
            return true;
        }
        return false;
    }

    isBibliOrAlunoOrProfessor(){
        if((this.isNotNull() && this.isBibliotecario()) 
        || (this.isNotNull() && this.isProfessor) 
        || (this.isNotNull() && this.isAluno)){
            return true;
        }
        return false;
    }

    logaout(){
        LocalStorageService.removeItem('usuario_logado')
    }

    render() {
        return (

            <div className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="container">
                    
                    <a className="navbar-brand">Biblioteca</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav">

                                <NavItem href="#/home" label="Home" render={this.isNotNull()}/>

                                <NavItem href="#/listarUsuarios" label="Usuarios" render={this.isBibliotecarioAndNotNull()}/>

                                <NavItem href="#/cadastroBibliotecario" label="Cadastrar bibliotecario" render={this.isBibliotecarioAndNotNull()}/>

                                <NavItem href="#/listarLivros" label="Livros" render={this.isBibliotecarioAndNotNull()}/>

                                <NavItem href="#/CadastroEmprestimo" label="Emprestimos" render={this.isBibliOrAlunoOrProfessor()}/>

                                <NavItem href="#/" label="Devoluções" render={this.isBibliOrAlunoOrProfessor()}/>

                                <DropDown titulo="Teste"  render={this.isBibliotecarioAndNotNull()}>
                                    <DropDownItem href="#/listarLivros" label="listar Livros"/>
                                </DropDown>

                                <NavItem href="#" label="Sair" render={this.isNotNull()} onClick={this.logaout}/>
                            </ul>
                        </div>
                </div>
            </div>
        )
    }
}