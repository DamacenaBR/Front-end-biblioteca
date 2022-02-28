import React from 'react'
import LocalStorageService from '../services/LocalStorage'
import NavBar from '../components/NavBar'

export default class Home extends React.Component {

    state = {
        usuario : ''
    }

    componentDidMount(){
        const user = JSON.parse(LocalStorageService.getItem('usuario_logado'))
        this.setState({usuario:user})
    }

    render() {
        return (
            <>
                <NavBar />
                <div className="container">
                    <div className="jumbotron">
                        <h1 className="display-3">Biblioteca!</h1>
                        <p className="lead">Seja bem vindo, {this.state.usuario.nome} {this.state.usuario.perfil}</p>
                        <hr className="my-4"/>
                        <p>Utilize nossa aplicação para maior comodidade</p>  
                    </div>
                </div>
            </>
        )
    }
}