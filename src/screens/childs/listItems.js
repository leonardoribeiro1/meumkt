import React, { Component } from 'react';
import ReactPlayer from 'react-player'

import axios from 'axios'

import {connect} from 'react-redux'

import logo from '../../assets/images/LOGO-MEUHALL-SF.png'


import bg101 from '../../assets/images/BANNER.png'

import imgVisitante from '../../assets/images/VISITANTES.png'

import '../../App.css'

//Icones

function onClickHandler(){
    // const data = new FormData() 
    // data.append('file', this.state.selectedFile)
    console.log('Botão funciona')
}

function goHome(){
  window.location.href = "/listItems"
}

function content(){
    window.location.href = "/item"
}
function goFilter(){
    window.location.href = "/listItems"
}


class ListItem extends Component{
  state = {
    visitantes: [],
    search: ''
  }

  loadVisitante = async () =>{
    await axios.get(`/visitante.json`)
            .catch(err => console.log(err))
            .then(res => {
                const visitAll = res.data
                let visitantes = []
                for(let key in visitAll){
                    visitantes.push({
                        ...visitAll[key],
                        id: key
                    })
                }
                // consultas
                visitantes = visitantes.filter(content => {
                    return content.condominio.includes(this.props.condominio)
                })

                visitantes = visitantes.filter(content => {
                  return(
                    content.cpf.includes(this.state.search)
                  ) 
                })
                
                this.setState({visitantes: visitantes})
            })
  }
  componentDidMount(){
    const loadPage = () => this.loadVisitante()
    loadPage()
  }

  searchVisit = (event) => {
    this.setState({search: event.target.value})
    const loadPage = () => this.loadVisitante()
    loadPage()
  }

  
  render() {
    const visitantes = this.state.visitantes 

    const listItem = visitantes.map((item) => 
            <li className="iten-list-content">
                <img className="iconContent" src={imgVisitante}/>
                <div className="txtContent">
                    <p className="txtContent-title">{item.nome} {item.sobrenome}</p>
                    <p className="txtContentDetls">CPF: {item.cpf}</p>
                    <p className="txtContentDetls">{item.tipo}</p>
                    <p className="txtContentDetls">Veiculo: {item.veiculo}</p>
                    <p className="txtContentDetls">Placa: {item.placa}</p>
                    <p className="txtContentDetls-ap">{item.morador}</p>
                </div>
            </li>
      )
    return (
      <div className="App">
        <div className="backgroundHero heroPg">
          <p><img className="backgroundHero heroPg" src={bg101}/></p>
        </div>
      <img className="App-logo" src={logo} alt-text="Logotipo" onClick={goHome} />

      <header className="App-header">
          <div className="search">
              <div className="searchBox">
                <p className="searchTitle">Pesquisar</p>
                <input type="text" className="inputStyle searchText inputText inputSmall" placeholder="Digite o CPF"
                value={this.state.search} onChange={this.searchVisit}
                />
              </div>
            <h1 className="nameIconePage">Visitantes - {this.props.condominio}</h1>
            <ul className="listBox">
                {listItem}
            </ul>
          </div>
    </header>
    <div className="footerSeparator">

    </div>
    </div>
    )
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

export default connect(mapStateToProps)(ListItem)