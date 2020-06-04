import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../App.css'

import {connect} from 'react-redux'
import {clickButton} from '../store/actions/index'
import { bindActionCreators } from 'redux';

import axios from 'axios'


// ITEMS ICONS
import imgMensalidade from '../assets/images/MENSALIDADE.png'


// Icones
import iconMensalidade from '../assets/images/ICONES/MENSALIDADE BRANCO.png'


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

  class Mensalidade extends Component{
    constructor(props){
      super(props)
      this.state = {
        id: '566',
        tipo: 'Mensalidade',
        mensal: [],
      }
    }
    loadMensal = async () => {
      await axios.get(`/mensalidade.json`)
              .catch(err => console.log(err))
              .then(res => {
                  const mensalAll = res.data
                  let mensal = []
                  for(let key in mensalAll){
                      mensal.push({
                          ...mensalAll[key],
                          id: key
                      })
                  }
                  // consultas
                  // visitantes = visitantes.filter(content => {
                  //     return content.condominio.includes(this.state.email)
                  // })
                  this.setState({mensal: mensal})
              })
    }

    componentDidMount() {
      const loadPage  = () => this.loadMensal()
      loadPage()
    }
  render(){
    // Mensalidade
    const mensalidades = this.state.mensal
      const listMensal = mensalidades.map((mensalidade) => 
            <li className="Areas type2"  onClick={
              () => this.setState({id: mensalidade.id}, () => {
                (this.props.clickButton(this.state))
                (window.location.href = "item")
              })
            }>
                    <img src={imgMensalidade} />
                    <p>{mensalidade.mes}</p>
            </li>
      )
  
    return (
        <section className="section section2 sectionColor" id="mensalidade">
            <h1 className="titleSection"><img src={iconMensalidade} width='50px'/>Mensalidade</h1>
            <ul  className="listAreas2">
              {listMensal}
            </ul>
        </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({clickButton}, dispatch);
}

export default connect(null, mapDispatchToProps)(Mensalidade);
// export default Mensalidade;