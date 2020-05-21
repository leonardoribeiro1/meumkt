import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../App.css'

import {connect} from 'react-redux'
import {clickButton, visitRegister} from '../store/actions/index'
import { bindActionCreators } from 'redux';

import axios from 'axios'


// ITEMS ICONS
import imgMensalidade from '../assets/images/MENSALIDADE.png'


// Icones
import iconTransparencia from '../assets/images/ICONES/TRANSPARENCIA BRANCO.png'


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

  class Transparence extends Component{
    constructor(props){
      super(props)
      this.state = {
        newId: '566',
        recebimentosCond: 22500,
        outrosRecebimentos: 12500,
        despesasFixas: 7500,
        despesasVariáveis: 7500,
        empresasTerceirizadas: 7500,
        servicos: 12500,
        contratos: 2500,

        fluxo: [],
      }
    }

    // loadFluxo = async () => {
    //   await axios.get(`/fluxo.json`)
    //           .catch(err => console.log(err))
    //           .then(res => {
    //               const fluxoAll = res.data
    //               let fluxo = []
    //               for(let key in fluxoAll){
    //                   fluxo.push({
    //                       ...fluxoAll[key],
    //                       id: key
    //                   })
    //               }
    //               // consultas
    //               fluxo = fluxo.filter(fluxoFilter => {
    //                   return fluxoFilter.categoria.includes('Recebimento Condomínio')
    //               })
    //               this.setState({recebimentosCond: fluxo.valor})
    //               const recCond = this.state.recebimentosCond
    //               const reducer = (accumulator, currentValue) => accumulator + currentValue
    //               this.setState({recebimentosCond: recCond.reduce(reducer)})
    //           })
    // }

    // componentDidMount() {
    //   const loadPage  = () => this.loadFluxo()
    //   loadPage()
    // }

  render(){
    return (
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
                <div className="barra" style={{height: this.state.contratos/100/2}}></div>
                <p>Contratos</p>
              </div>
            </div>
            
        </section>
    );
  }
}

export default Transparence;