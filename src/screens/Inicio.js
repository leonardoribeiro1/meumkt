import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../App.css'

import logo from '../assets/images/LOGO-MEUHALL-SF.png'

import {connect} from 'react-redux'
import {clickButton, LoggedIn} from '../store/actions/index'
import { bindActionCreators } from 'redux';

import axios from 'axios'

//Imagens
import bgSite from '../assets/images/BANNER.png'

// Icones
import iconOuvidoria from '../assets/images/ICONES/OUVIDORIA ROXO.png'

// Components
import Avisos from '../components/avisos'
import Mensalidade from '../components/mensalidade'
import Calendario from '../components/calendario'
import Transparence from '../components/transparence'
import Visitantes from '../components/visitante'


  //mudança de páginas
  function inicio(){
    window.location.href = window.location.href + "inicio"
  }
  
  class Home extends Component{
    constructor(props){
      super(props)
      this.state = {
        userType: this.props.tipo,
        ouvidoria: '',
        botao:'Enviar',
      }
    }
  
  render(){  

   const userType = () => {
      if(this.props.tipo === 'sindico'){
        window.location.href = window.location.href + "homeManager"
      }else if(this.props.tipo === ''){
        window.location.href = "/"
      }else{

      }
    }
    
    return (

      <div className="App" onClick={
        userType()
      }>
        <div className="backgroundHero">
          <p><img className="backgroundHero" src={bgSite}/></p>
        </div>
        <nav className="Navmenu Navlogo">
          <h5 className="titleTxt">- {this.props.condominio} -</h5>
          <p className="titleTxt">Seja bem vindo <b>{this.props.nome}</b></p>
          <img src={logo} className="logo logoHome" onClick={inicio}/>
        </nav>
        


        <Avisos />

        <Mensalidade/>

        <Calendario />

        <Transparence />

        <Visitantes />
        

        <section className="section section2" id="ouvidoria">
        <h1 className="titleSection"><img src={iconOuvidoria} width='50px'/>Ouvidoria</h1>
            <form>
              <textarea type="text" placeholder="Enviar mensagem ao síndico" className="mensage" value={this.state.ouvidoria} onChange={(event) => this.setState({ouvidoria: event.target.value})} />
              <br/>
              <input type="button" value={this.state.botao} className="mensageBtn"
              onClick={
                () => {
                  if(this.state.tipoVisit === ''){
                    this.setState({botao: 'Selecione o Tipo'})
                  }
                  else{
                    axios.post(`/ouvidoria.json`, {
                      descricao: this.state.ouvidoria,
                      data: new Date(),
                      condominio: this.props.condominio,
                      morador: this.props.nome,
                    })
                    this.setState({botao: 'Enviando', ouvidoria: ''})
                    setInterval(() => {
                      this.setState({
                        botao: 'Cadastrar',
                      })}, 2000)
                  }
                }
                }
              />
            </form>
        </section>
=
        {/* <header className="App-header">
        </header> */}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return{
    id: store.lembretes.id,
    tipo: store.user.tipo,
    nome: store.user.name,
    condominio: store.user.condominio,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({clickButton, LoggedIn}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);