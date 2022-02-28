import React from 'react'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import NavBar from '../components/NavBar'
import { messageErro, messageSucess } from '../components/Toastr'
import ProfessorService from '../services/ProfessorService'
import CursoService from '../services/CursoService'
import BibliotecaServices from '../services/BibliotecaService'
import CidadesService from '../services/CidadesService'
import EstadoService from '../services/estadoService'
export default class CadastroProfessor extends React.Component {

    constructor() {
        super()
        this.professorService = new ProfessorService()
        this.cursoService = new CursoService()
        this.bibliotecaService = new BibliotecaServices()
        this.estadoService = new EstadoService()
        this.cidadesService = new CidadesService()
    }

    state = {
        id: '',
        nome: '',
        cpf: '',
        genero: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        email: '',
        telefone: '',
        matricula: '',
        senha: '',
        cursoID:'',
        bibliotecaID: '',
        perfil: '',
        cursos: [],
        bibliotecas: [],
        estados: [],
        cidades: []

    }

    resetForm = () => {
        this.setState({
            nome: '',
            cpf: '',
            genero: '',
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            uf: '',
            email: '',
            telefone: '',
            matricula: '',
            senha: '',
            cursoID: '',
            bibliotecaID: '',
            perfil: ''
        })
    }

    ordernarLista = (a, b) => {
        return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)
    }

    initEstados = () => {
        this.estadoService.bucarEstados()
            .then(response => {
                const estadosOrdenados = response.data
                estadosOrdenados.sort(this.ordernarLista)
                this.setState({
                    estados: estadosOrdenados
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    cidadesDoEstado = (estado) => {
        this.setState({ uf: estado })
        this.cidadesService.bucarCidadesPorUd(estado)
            .then(response => {
                this.setState({
                    cidades: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    componentDidMount() {
        this.initEstados()

        this.cursoService.buscarTodos()
            .then(response => {
                this.setState({ cursos: response.data })
            })

        this.bibliotecaService.buscarTodos()
            .then(response => {
                this.setState({ bibliotecas: response.data })
            })

        const params = this.props.match.params
        if (params.id) {
            this.professorService.buscarProfessorPorID(params.id)
                .then(response => {
                    this.setState({ ...response.data })
                    const user = response.data
                    const { endereco: { rua, bairro, numero, cidade } } = user
                    this.setState({
                        rua: rua,
                        numero: numero,
                        bairro: bairro,
                        cidade: cidade,
                    })
                    const { contato: { email, telefone } } = user
                    this.setState({
                        email: email,
                        telefone: telefone,
                    })
                    const { login: { matricula, senha } } = user

                    this.setState({
                        matricula: matricula,
                        senha: senha,
                    })

                })
                .catch(error => {
                    messageErro("Erro ao tentar recuperar usuário")
                })
        }
    }

    save = () => {
        const user = {
            id: this.state.id,
            nome: this.state.nome,
            cpf: this.state.cpf,
            genero: this.state.genero,
            endereco: {
                rua: this.state.rua,
                numero: this.state.numero,
                bairro: this.state.bairro,
                cidade: this.state.cidade,
                uf: this.state.uf
            },
            contato: {
                email: this.state.email,
                telefone: this.state.telefone
            },
            login: {
                matricula: this.state.matricula,
                senha: this.state.senha
            },
            cursos:[
                {
                    id: this.state.cursoID
                }
            ],
            biblioteca: {
                id: this.state.bibliotecaID
            },
            perfil: this.state.perfil
        }

        if (this.state.id == null) {
            this.professorService.salvar(user)
                .then(user => {
                    messageSucess("Usuário cadastrado com sucesso!")
                    this.resetForm()
                })
                .catch(erro => {
                    messageErro("Erro ao realizar o cadastro")
                })
        }
        else {
            this.professorService.atualizarProfessor(user)
                .then(user => {
                    messageSucess("Usuário atualizado com sucesso!")
                    this.resetForm()
                })
                .catch(erro => {
                    messageErro("Erro ao atualizado o cadastro")
                })
        }
    }

    render() {
        const listCursos = this.state.cursos
        const listBibliotecas = this.state.bibliotecas
        const estadosOrdenados = this.state.estados
        const cidadesDoEstado = this.state.cidades
        return (
            <>
                <NavBar />
                <div className="container">
                    <div className="row">
                        <div className="col-6" style={{ position: 'relative', left: '300px' }}>
                            <Card titulo="Cadastro de Professor">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup htmlFor="inputNOME" label="Nome * :">
                                                    <input type="text"
                                                        value={this.state.nome}
                                                        onChange={(e) => this.setState({ nome: e.target.value })}
                                                        className="form-control"
                                                        id="inputNOME"
                                                        aria-describedby="nomeHelp"
                                                        placeholder="Digite o nome" />
                                                </FormGroup>

                                                <FormGroup htmlFor="inputCPF" label="CPF * :">
                                                    <input type="text"
                                                        value={this.state.cpf}
                                                        onChange={(e) => this.setState({ cpf: e.target.value })}
                                                        className="form-control"
                                                        id="inputCPF"
                                                        aria-describedby="cpfHelp"
                                                        placeholder="Digite o cpf" />
                                                </FormGroup>

                                                <FormGroup htmlFor="inputGENERO" label="GENERO * :">
                                                    <fieldset className="form-group">
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input type="radio"
                                                                    onChange={(e) => this.setState({ genero: e.target.value })}
                                                                    className="form-check-input"
                                                                    name="optionsRadios"
                                                                    id="optionsRadios2"
                                                                    value="0" />
                                                    Masculino
                                                    </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input type="radio"
                                                                    className="form-check-input"
                                                                    name="optionsRadios"
                                                                    id="optionsRadios2"
                                                                    onChange={(e) => this.setState({ genero: e.target.value })}
                                                                    value="1" />
                                                    Feminino
                                                    </label>
                                                        </div>
                                                    </fieldset>

                                                </FormGroup>


                                                <FormGroup htmlFor="inputRua" label="Rua * :">
                                                    <input type="text"
                                                        value={this.state.rua}
                                                        onChange={(e) => this.setState({ rua: e.target.value })}
                                                        className="form-control"
                                                        id="inputRUA"
                                                        aria-describedby="ruaHelp"
                                                        placeholder="Digite a rua" />
                                                </FormGroup>


                                                <div className="form-group row mb-1">
                                                    <div className="col-6">
                                                        <FormGroup htmlFor="inputBAIRRO" label="BAIRRO * :">
                                                            <input type="text"
                                                                value={this.state.bairro}
                                                                onChange={(e) => this.setState({ bairro: e.target.value })}
                                                                className="form-control"
                                                                id="inputBAIRRO"
                                                                aria-describedby="bairroHelp"
                                                                placeholder="Digite o bairro" />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-6">
                                                        <FormGroup htmlFor="inputNUMERO" label="NUMERO * :">
                                                            <input type="text"
                                                                value={this.state.numero}
                                                                onChange={(e) => this.setState({ numero: e.target.value })}
                                                                className="form-control"
                                                                id="inputNUMERO"
                                                                aria-describedby="numeroHelp"
                                                                placeholder="Digite o numero" />
                                                        </FormGroup>
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-1">
                                                    <div className="col-6">
                                                        <FormGroup htmlFor="inputESTADO" label="ESTADO * :">
                                                            <div className="form-group">
                                                                <select className="form-control"
                                                                    value={this.state.uf}
                                                                    id="selectESTADO"
                                                                    onChange={(e) => this.cidadesDoEstado(e.target.value)}>
                                                                    <option></option>
                                                                    {
                                                                        estadosOrdenados.map(estado => (
                                                                            <option value={estado.sigla}>{estado.nome}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-6">
                                                        <FormGroup htmlFor="inputCIDADE" label="CIDADE * :">
                                                            <div className="form-group">
                                                                <select className="form-control"
                                                                    value={this.state.cidade}
                                                                    id="exampleSelect1"
                                                                    onChange={(e) => this.setState({ cidade: e.target.value })}>
                                                                    <option></option>
                                                                    {
                                                                        cidadesDoEstado.map(cidade => (
                                                                            <option value={cidade.nome}>{cidade.nome}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </FormGroup>
                                                    </div>

                                                </div>

                                                <div className="form-group row mb-1">
                                                    <div className="col-6">
                                                        <FormGroup htmlFor="inputEMAIL" label="EMAIL * :">
                                                            <input type="text"
                                                                value={this.state.email}
                                                                onChange={(e) => this.setState({ email: e.target.value })}
                                                                className="form-control"
                                                                id="inputEMAIL"
                                                                aria-describedby="emailHelp"
                                                                placeholder="Digite o email" />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-6">
                                                        <FormGroup htmlFor="inputTELEFONE" label="TELEFONE * :">
                                                            <input type="text"
                                                                value={this.state.telefone}
                                                                onChange={(e) => this.setState({ telefone: e.target.value })}
                                                                className="form-control"
                                                                id="inputTELEFONE"
                                                                aria-describedby="telefoneHelp"
                                                                placeholder="Digite o telefone" />
                                                        </FormGroup>
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-1">
                                                    <div className="col-6">
                                                        <FormGroup htmlFor="inputMATRICULA" label="Matriculas * :">
                                                            <input type="email"
                                                                value={this.state.matricula}
                                                                onChange={(e) => this.setState({ matricula: e.target.value })}
                                                                className="form-control"
                                                                id="inputMATRICULA"
                                                                aria-describedby="emailHelp"
                                                                placeholder="Digite o matricula" />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-6">
                                                        <FormGroup htmlFor="inputSenha" label="Senha * :">
                                                            <input type="password"
                                                                value={this.state.senha}
                                                                onChange={(e) => this.setState({ senha: e.target.value })}
                                                                className="form-control"
                                                                id="inputSenha"
                                                                aria-describedby="senhaHelp"
                                                                placeholder="Digite a senha" />
                                                        </FormGroup>
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-1">
                                                    <div className="col-6">
                                                    <FormGroup htmlFor="inputCURSO" label="CURSO * :">
                                                        <div className="form-group">
                                                            <select className="form-control"
                                                            value={this.state.cursoID} 
                                                            id="exampleSelect1" 
                                                            onChange={(e) => this.setState({cursoID: e.target.value})}>
                                                            <option></option>
                                                            {                                                                
                                                                listCursos.map(curso => (
                                                                    <option key={curso.id} value={curso.id}>{curso.nomeCurso}</option>
                                                                ))
                                                            }
                                                            </select>
                                                        </div>
                                                    </FormGroup>
                                                    </div>
                                                    <div className="col-6 ">
                                                        <FormGroup htmlFor="inputBIBLIOTECA" label="BIBLIOTECA * :">
                                                            <div className="form-group">
                                                                <select className="form-control"
                                                                    value={this.state.bibliotecaID}
                                                                    id="inputBIBLIOTECA"
                                                                    onChange={(e) => this.setState({ bibliotecaID: e.target.value })}>
                                                                    <option></option>
                                                                    {
                                                                        listBibliotecas.map(biblioteca => (
                                                                            <option key={biblioteca.id} value={biblioteca.id}>{biblioteca.nome}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>

                                                        </FormGroup>
                                                    </div>
                                                </div>

                                                <FormGroup htmlFor="inputPERFIL" label="PERFIL * :">
                                                    <div className="form-group">
                                                        <select className="form-control"
                                                            value={this.state.perfil}
                                                            id="inputPERFIL"
                                                            onChange={(e) => this.setState({ perfil: e.target.value })}>
                                                            <option></option>
                                                            <option value="professor">Professor</option>
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



