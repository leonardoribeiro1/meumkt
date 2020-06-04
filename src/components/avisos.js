import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../App.css'

import {connect} from 'react-redux'
import {clickButton, LoggedOut} from '../store/actions/index'
import { bindActionCreators } from 'redux';

import axios from 'axios'


// ITEMS ICONS
import imgAvisos from '../assets/images/AVISO.png'


// Icones
import iconAvisos from '../assets/images/ICONES/AVISOS ROXOS.png'

  //mudança de páginas
  function list(){
    window.location.href = "/listItems"
  }
  function inicio(){
    window.location.href = "/inicio"
  }
  function itemClick(){
    window.location.href = "/item"
    console.log(this.state.id)
  }

  class Avisos extends React.Component{
    
    constructor(props){
      super(props)
      this.state = {
        id: '566',
        tipo: 'aviso',
        avisos: [],
        carregar: 'Carregar Avisos',
        btnLoad: "visitanteBtn"
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
                  // visitantes = visitantes.filter(content => {
                  //     return content.condominio.includes(this.state.email)
                  // })
                  this.setState({avisos: avisos})
              })
    }

    componentDidMount() {
      const loadPage  = () => this.loadAvisos()
      loadPage()
    }
  
  render(){

    // Avisos
    const avisos = this.state.avisos 
  
    const listAvisos = avisos.map((aviso) => 
        <a className="Areas type1" key={aviso.id} href="#/item"
        onClick={
          () => {this.setState({id: aviso.id}, () => {
            (this.props.clickButton(this.state))
          })}
        }
        >
              <img src={imgAvisos}/>
              <p className='titleCard'> {aviso.aviso} </p>
              <p className='txtCard'> {aviso.description} </p>
      </a>
    )
  
    return (
    <div>
        <section className="section" id="avisos" >
        <div>
                <ul className="listAreas">
                    <a href="#/inicio/#avisos" className="Areas type4 type4-1" >
                        <p>Avisos</p>
                    </a>
                    <a href="#/inicio/#mensalidade" className="Areas type4">
                        <p>Mensalidade</p>
                    </a>
                    <a href="#/inicio/#eventos" className="Areas type4">
                        <p>Eventos</p>
                    </a>
                    <a href="#/inicio/#transparencia" className="Areas type4">
                        <p>Transparência</p>
                    </a>
                    <a href="#/inicio/#visitantes" className="Areas type4">
                        <p>Visitantes</p>
                    </a>
                    <a href="#/inicio/#ouvidoria" className="Areas type4">
                        <p>Ouvidoria</p>
                    </a>
                    <a href="" className="Areas type4 type4-2">
                        <p>Sair</p>
                    </a>
                </ul>
          </div>
            <h1 className="titleSection"><img src={iconAvisos} width='50px'/>
              Mural de Avisos
            </h1>
            <ul  className="listAreas2">
              {listAvisos}
            </ul>
        </section>

      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators({clickButton, LoggedOut}, dispatch);
}

export default connect(null, mapDispatchToProps)(Avisos);