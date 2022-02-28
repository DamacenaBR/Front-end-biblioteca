import React from 'react'
import PessoaService from '../services/PessoaService'
import NavBar from '../components/NavBar'
import AlunoServices from '../services/AlunoService'
import { messageErro, messageSucess } from '../components/Toastr'
import ProfessorServices from '../services/ProfessorService'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

export default class ListaUsuarios extends React.Component{

    constructor(){
        super()
        this.pessoaService = new PessoaService()
        this.alunoService = new AlunoServices()
        this.professorService = new ProfessorServices()
    }

    state = {
        usuarios : [],
        renderDialogFooter: false,
        usuarioDeletar:''
    }

    prepareCadastroAlunos = () => {
        this.props.history.push("/cadastroAlunos")
    }

    prepareCadastroProfessor = () => {
        this.props.history.push("/cadastroProfessor")
    }

    componentDidMount(){
        this.pessoaService.buscarTodos()
        .then(response =>{
            this.setState({usuarios : response.data})
        })
    }

    prepareExcluir = (usuario) => {
        this.setState({renderDialogFooter:true,usuarioDeletar:usuario})
    }

    confirmeCancelar = () => {
        this.setState({renderDialogFooter:false,usuarioDeletar:{}})
    }

    excluir = () => {
        if(this.state.usuarioDeletar.perfil === 'aluno'){
            this.alunoService.deleteAlunoPorID(this.state.usuarioDeletar.id)
            .then(response => {
                const users = this.state.usuarios
                const index = users.indexOf(this.state.usuarioDeletar)
                users.splice(index,1)
                this.setState({
                    usuarios:users
                })
                messageSucess("Aluno excluido com sucesso!")
                this.confirmeCancelar()
            })
            .catch(erro => {
                messageErro("Erro ao excluir o aluno")
            })
        }
        else if(this.state.usuarioDeletar.perfil === 'professor'){
            this.professorService.deleteProfessorPorID(this.state.usuarioDeletar.id)
            .then(response => {
                const users = this.state.usuarios
                const index = users.indexOf(this.state.usuarioDeletar)
                users.splice(index,1)
                this.setState({
                    usuarios:users
                })
                messageSucess("Professor excluido com sucesso!")
                this.confirmeCancelar()
            })
            .catch(erro => {
                messageErro("Erro ao excluir o professor")
            })
        }
        else{
            messageErro("Erro ao excluir o usuario")
        }

    }

    prepareEditar = (usuario) => {
        if(usuario.perfil === 'aluno'){
            this.props.history.push(`/cadastroAlunos/${usuario.id}`)
        }
        else{
            this.props.history.push(`/cadastroProfessor/${usuario.id}`)
        }
    }

    render(){

        const users = this.state.usuarios

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
                    Confirma a exlusão do usuário?
            </Dialog>
            
            <NavBar/>

            <div className="container">

                <div className="row">
                    <button type="button" onClick={this.prepareCadastroAlunos} className="btn btn-primary mr-3">Cadastrar Aluno</button>
                    <button type="button" onClick={this.prepareCadastroProfessor} className="btn btn-primary">Cadastrar Professor</button>
                </div>
                <table className="table table-hover mt-5">
                    <thead>
                        <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Email</th>
                        <th scope="col">Pefil</th>
                        <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        users.map(usuario => (
                            //usuario.perfil !== 'bibliotecario' ?
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.cpf}</td>
                                <td>{usuario.contato.email}</td>
                                <td>{usuario.perfil}</td>
                                <td>
                                    <button type="button" onClick={((e) => this.prepareEditar(usuario))} className="btn btn-secondary">editar</button>
                                    <a> </a>
                                    <button type="button" onClick={((e) => this.prepareExcluir(usuario))} className="btn btn-danger">excluir</button>
                                </td>
                            </tr>
                            //: null
                        ))
                        }
                        
                    </tbody>
                </table>
            </div>
            
        </>
        )
    }
}