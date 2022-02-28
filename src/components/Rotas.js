import React from 'react'

import {Route, Switch, HashRouter} from 'react-router-dom'
import CadastroAlunos from '../views/CadastroAlunos'
import cadastroProfessor from '../views/CadastroProfessor'
import CadastroBibliotecario from '../views/CadastroBibliotecario'
import ListarUsuarios from '../views/ListaUsuarios'
import ListarLivros from '../views/ListaLivros'
import CadastroLivro from '../views/CadastroLivro'
import CadastroEmprestimo from '../views/CadastroEmprestimo'
import Home from '../views/Home'
import Login from '../views/Login'

export default function Rotas(){
    
    return(
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/home" exact component={Home}/>
                <Route path="/cadastroAlunos/:id?" exact component={CadastroAlunos}/>
                <Route path="/cadastroProfessor/:id?" exact component={cadastroProfessor}/>
                <Route path="/cadastroBibliotecario" exact component={CadastroBibliotecario}/>
                <Route path="/listarUsuarios" exact component={ListarUsuarios}/>
                <Route path="/listarLivros" exact component={ListarLivros}/>
                <Route path="/CadastroLivros/:id?" exact component={CadastroLivro}/>
                <Route path="/CadastroEmprestimo" exact component={CadastroEmprestimo}/>
            </Switch>
        </HashRouter>
    )
}