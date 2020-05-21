import React, { Component } from 'react';
import logo from '../../assets/images/LOGO-MEUHALL-SF.png'
import '../../App.css'

import {connect} from 'react-redux'
import {clickButton} from '../../store/actions/index'
import { bindActionCreators } from 'redux';

import ReactDOM from 'react-dom'

import axios from 'axios'
import moment from 'moment'


//Imagens
import bgSite from '../../assets/images/BANNER.png'
import bgSite1 from '../../assets/images/bg107.jpg'
import bgSite2 from '../../assets/images/bg106.jpg'
import bgSite3 from '../../assets/images/bg105.jpg'
import bgSite4 from '../../assets/images/bg102.jpg'
import bg101 from '../../assets/images/bg105.jpg'
import imgAluno from '../../assets/images/aluno.png'
import imgSchool from '../../assets/images/school.png'

// ITEMS ICONS
import imgAvisos from '../../assets/images/AVISO.png'
import imgMensalidade from '../../assets/images/MENSALIDADE.png'
import imgVisitante from '../../assets/images/VISITANTES.png'

// Icones
import iconAvisos from '../../assets/images/ICONES/AVISOS ROXOS.png'
import iconMensalidade from '../../assets/images/ICONES/MENSALIDADE BRANCO.png'
import iconEventos from '../../assets/images/ICONES/EVENTOS ROXO.png'
import iconTransparencia from '../../assets/images/ICONES/TRANSPARENCIA BRANCO.png'
import iconVisitantes from '../../assets/images/ICONES/VISITANTE ROXO.png'
import iconOuvidoria from '../../assets/images/ICONES/OUVIDORIA ROXO.png'

  //mudança de páginas
  function list(){
    window.location.href = "/listItems"
  }
  function inicio(){
    window.location.href = "/homeManager"
  }
  function itemClick(){
    window.location.href = "/item"
  }

  function goFilter(){
    window.location.href = "/listItems"
  }
  class Home extends Component{
    constructor(props){
      super(props)
      this.state = {
        userTipe: 'sindico',
        id: this.props.id,
        tipo: '',

        recebimentosCond: 22500,
        outrosRecebimentos: 12500,
        despesasFixas: 7500,
        despesasVariáveis: 7500,
        empresasTerceirizadas: 7500,
        servicos: 12500,
        contratos: 2500,

        avisos: [ ],
        eventos: [ ],
      }
    }

    loadAvisos = async () => {
      await axios.get(`/aviso.json`)
              .catch(err => console.log(err))
              .then(res => {
                  const avisoAll = res.data
                  let avisos = []
                  for(let key in avisoAll){
                      avisos.push({
                          ...avisoAll[key],
                          id: key
                      })
                  }
                  // consultas
                  avisos = avisos.filter(content => {
                      return content.condominio.includes(this.props.condominio)
                  })
                  this.setState({avisos: avisos})
              })
    }

    loadEventos = async () => {
      await axios.get(`/evento.json`)
              .catch(err => console.log(err))
              .then(res => {
                  const eventAll = res.data
                  let eventos = []
                  for(let key in eventAll){
                      eventos.push({
                          ...eventAll[key],
                          id: key
                      })
                  }
                  // consultas
                  eventos = eventos.filter(content => {
                      return content.condominio.includes(this.props.condominio)
                  })

                  this.setState({eventos: eventos})
              })
    }

    componentDidMount() {
      const loadPage  = () => {
        this.loadAvisos()
        this.loadEventos()
      }
      loadPage()
    }


  render(){


    // Avisos
    const avisos = this.state.avisos
    const listAvisos = avisos.map((aviso) => 
        <li className="Areas type1" key={aviso.id}
        onClick={
          () => {this.setState({id: aviso.id}, () => {
            (this.props.clickButton(this.state))
            (window.location.href = "/item")
          })}
        }
        >
              <img src={imgAvisos}/>
              <p className='titleCard'> {aviso.aviso} </p>
              <p className='txtCard'> {aviso.description} </p>
      </li>
    )
  
    // Calendário
      const eventos = this.state.eventos
    const listEvent = eventos.map((evento) => 
            <li className="Areas type3" >
                <div className="type3">
                    <h1>{moment(evento.data).format('L')}</h1>
                    <p>{evento.evento}</p>
                </div>
            </li>
    )


    return (
      <div className="App">
        <div className="backgroundHero">
          <p><img className="backgroundHero" src={bgSite}/></p>
        </div>
        <nav className="Navmenu Navlogo">
          <h5 className="titleTxt">- {this.props.condominio} -</h5>
          <p className="titleTxt">Seja bem-vindo <b>{this.props.nome}</b></p>
          <img src={logo} className="logo logoHome" onClick={inicio}/>
        </nav>
        


        <section className="section" id="avisos">
        <div>
                <ul className="listAreas">
                    <a href="/dashboard" className="Areas type4 type4-1" >
                        <p>dashboard</p>
                    </a>
                    <a href="#transparencia" className="Areas type4">
                        <p>Transparência</p>
                    </a>
                    <a href="#eventos" className="Areas type4">
                        <p>Eventos</p>
                    </a>
                    <a href="/" className="Areas type4 type4-2">
                        <p>Sair</p>
                    </a>
                </ul>
          </div>
            <h1 className="titleSection"><img src={iconAvisos} width='50px'/>Mural de Avisos</h1>
            <ul  className="listAreas2">
              {listAvisos}
            </ul>
        </section>

        <section className="section section2 sectionColor" id="transparencia">
            <h1 className="titleSection"><img src={iconTransparencia} width='50px'/>Transparência</h1>

            <div className="Grafich">
              <div className="barrasSection"> 
                <p>R$ {this.state.recebimentosCond}</p>
                <div className="barra" style={{height: this.state.recebimentosCond/100/2}}></div>
                <p>Recebimentos Condomínio</p>
              </div>
              <div className="barrasSection"> 
                <p>R$ {this.state.outrosRecebimentos}</p>
                <div className="barra" style={{height: this.state.outrosRecebimentos/100/2}}></div>
                <p>Outros Recebimentos</p>
              </div>
              <div className="barrasSection"> 
                <p>R$ {this.state.despesasFixas}</p>
                <div className="barra" style={{height: this.state.despesasFixas/100/2}}></div>
                <p>Despesas Fixas</p>
              </div>
              <div className="barrasSection"> 
                <p>R$ {this.state.despesasVariáveis}</p>
                <div className="barra" style={{height: this.state.despesasVariáveis/100/2}}></div>
                <p>Despesas Vaiáveis</p>
              </div>
              <div className="barrasSection"> 
                <p>R$ {this.state.empresasTerceirizadas}</p>
                <div className="barra" style={{height: this.state.empresasTerceirizadas/100/2}}></div>
                <p>Empresas Terceirizadas</p>
              </div>
              <div className="barrasSection"> 
                <p>R$ {this.state.servicos}</p>
                <div className="barra" style={{height: this.state.servicos/100/2}}></div>
                <p>Serviços</p>
              </div>
              <div className="barrasSection"> 
                <p>R$ {this.state.contratos}</p>
                <div className="barra" style={{height: this.state.contratos/100}}></div>
                <p>Contratos</p>
              </div>
            </div>
            
        </section>
        <section className="section section2" id="eventos">
            <h1 className="titleSection"><img src={iconEventos} width='50px'/>Eventos</h1>
            <ul  className="listAreas2">
              {listEvent}
            </ul>
        </section>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return{
    nome: store.user.name,
    condominio: store.user.condominio,
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;