import React, { Component } from 'react';
import ReactPlayer from 'react-player'

import axios from 'axios'

import {connect} from 'react-redux'

import logo from '../../assets/images/LOGO-MEUHALL-SF.png'
import bg101 from '../../assets/images/BANNER.png'
import bg102 from '../../assets/images/bg112.jpg'
import '../../App.css'

//Icones
function goHome(){
  window.location.href = "homeManager"
}
function goCadastroMorador(){
  window.location.href = "cadastroMorador"
}
function goPainelFinanceiro(){
  window.location.href = "painelFinanceiro"
}

class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state = {
      id: this.props.id,
      condominio: '',
      morador: '',
      mes: '',
      descricaoMensalidade: '',
      aquivo: '',
      aviso: '',
      descricaoAviso: '',
      evento: '',
      dataEvento: '',
      localEvento: '',
      descricaoEvento: '',


      botãoMensalidade: 'Enviar',
      botão: 'Enviar',
      botãoEvent: 'Enviar',

      ouvidoria: [],
    }
  }

  loadOuvidoria = async () => {
    await axios.get(`/ouvidoria.json`)
            .catch(err => console.log(err))
            .then(res => {
                const ouvidoriaAll = res.data
                let ouvidoria = []
                for(let key in ouvidoriaAll){
                    ouvidoria.push({
                        ...ouvidoriaAll[key],
                        id: key
                    })
                }
                // consultas
                ouvidoria = ouvidoria.filter(content => {
                    return content.condominio.includes(this.props.condominio)
                })

                this.setState({ouvidoria: ouvidoria})
            })
  }
  componentDidMount(){
    const loadPage = () => this.loadOuvidoria()
    loadPage()
  }
  
  render() {
    // Apartamentos
    const items = [
      {
          id: 1,
          morador: '910-A',
          condominio: 'Modelo'
      },
      {
        id: 2,
        morador: '910-B',
        condominio: 'Modelo'
      },

      ]  
      const listItem = items.map((item) => 
          <option value={item.morador}>
            {item.morador}
          </option>
      )

      // Meses
      const meses = [
        {nome: 'Janeiro'},
        {nome: 'Fevereiro'},
        {nome: 'Março'},
        {nome: 'Abril'},
        {nome: 'Maio'},
        {nome: 'Junho'},
        {nome: 'Julho'},
        {nome: 'Agosto'},
        {nome: 'Setembro'},
        {nome: 'Outubro'},
        {nome: 'Novembro'},
        {nome: 'Dezembro'},
        ]  
        const mesList = meses.map((mes) => 
            <option value={mes.nome}>
              {mes.nome}
            </option>
        )

    // Comentários

    const comments = this.state.ouvidoria

      const commentsList = comments.map((comment) => 
          <li className="comment">
            <h1>{comment.morador}</h1>
            <p>{comment.descricao}</p>
          </li>
      )
    return (
    <div className="App">
    <div className="backgroundHero heroPg">
      
    <p>
      <img className="backgroundHero heroPg" src={bg101}/>
    </p>
    
        </div>
        <img className="App-logo" src={logo} alt-text="Logotipo" onClick={goHome}/>

        <header className="item-header-dashboard">
            <div className="btnBox btnFinanceiro">
                <h5 className="titleTxt" style={{color: '#7f32ee'}}>{this.props.condominio}</h5>
                <input type="button" onClick={goPainelFinanceiro} className="btnSend btnFinanceiroIn" value="Painel Financeiro"/>
                <input type="button" onClick={goCadastroMorador}  className="btnSend btnFinanceiroIn" value="Cadastrar Morador"/>
            </div>
        </header>

        <div className="searchBox itemBoxInsert corBox">
            <p className="searchTitle">Mensalidade</p>
            <select className="inputStyle searchText inputText inputSmall inputItem selectInput" value={this.state.morador} onChange={(event) => this.setState({morador: event.target.value})}>
              <option value="">Selecione o Morador</option>
              {listItem}
            </select>
            <select className="inputStyle searchText inputText inputSmall inputItem selectInput" value={this.state.mes} onChange={(event) => this.setState({mes: event.target.value})}>
              <option value="">Selecione o Mês</option>
              {mesList}
            </select>
            <textarea className="inputStyle searchText inputText inputSmall inputItem descripton" placeholder="Descrição" value={this.state.descricaoMensalidade} onChange={(event) => this.setState({descricaoMensalidade: event.target.value})}/>
            <div className="imageBox">
                <p className="searchTitle">Arquivo</p>
                <input type="file" className="inputStyle inputText inputSmall inputItem inputFile" />
            </div>
            <div className="btnBox">
                <input type="button"  className="btnSend" value="Enviar" 
                onClick={() => {
                  axios.post(`/mensalidade.json`, {
                    morador: this.state.morador,
                    mes: this.state.mes,
                    description: this.state.descricaoMensalidade,
                    condominio: this.props.condominio,
                    sindico: this.props.nome,
                  })
                  this.setState({
                    morador: '',
                    mes: '',
                    descricaoMensalidade: '',
                    arquivo: '',
                  })
                }}/>
            </div>
        </div>

        <div className="searchBox  mensalBoxInsert ">
            <p className="searchTitle">Aviso</p>
            <input type="text" className="inputStyle searchText inputText inputSmall inputItem " placeholder="Aviso" value={this.state.aviso} onChange={(event) => this.setState({aviso: event.target.value})}/>
            <textarea className="inputStyle searchText inputText inputSmall inputItem descripton" placeholder="Descrição" value={this.state.descricaoAviso} onChange={(event) => this.setState({descricaoAviso: event.target.value})}/>
            <div className="btnBox">
                <input type="button"  className="btnSend" value={this.state.botão} 
                onClick={() => {
                  
                  if(this.state.aviso === ''){
                    this.setState({botão: 'Digite seu Titulo'})
                  }
                  else if(this.state.descricaoAviso === ''){
                    this.setState({botão: 'Digite uma descrição'})
                  }
                  else if(this.state.descricaoAviso.length <= 50){
                    this.setState({botão: 'Melhore sua descrição'})
                  }
                  else if(this.state.botão === 'Enviando'){
                    this.setState({botão: 'Aguarde o Envio'})
                  }
                  else{
                    axios.post(`/aviso.json`, {
                      aviso: this.state.aviso,
                      description: this.state.descricaoAviso,
                      condominio: this.props.condominio,
                      sindico: this.props.nome,
                      data: new Date(),
                    })
                    this.setState({botão: 'Enviando', aviso: '', descricaoAviso: ''})
                    setInterval(() => {
                      this.setState({
                        botão: 'Enviar',
                      })
                    }, 2000)
                  } 
                }
              }/>
            </div>
        </div>

        

        <div className="searchBox mensalBoxInsert ">
            <p className="searchTitle">Eventos</p>
            <input type="text" className="inputStyle searchText inputText inputSmall inputItem " placeholder="Evento" value={this.state.evento} onChange={(event) => this.setState({evento: event.target.value})}/>
            <input type="date" className="inputStyle searchText inputText inputSmall inputItem " placeholder="Data" value={this.state.dataEvento} onChange={(event) => this.setState({dataEvento: event.target.value})}/>
            <input type="text" className="inputStyle searchText inputText inputSmall inputItem " placeholder="Local" value={this.state.localEvento} onChange={(event) => this.setState({localEvento: event.target.value})}/>
            <textarea className="inputStyle searchText inputText inputSmall inputItem descripton" placeholder="Descrição" value={this.state.descricaoEvento} onChange={(event) => this.setState({descricaoEvento: event.target.value})}/>
            <div className="btnBox">
                <input type="button"  className="btnSend" value={this.state.botãoEvent}
                onClick={() => {
                  if(this.state.evento === ''){
                    this.setState({botãoEvent: 'Digite seu Titulo'})
                  }
                  else if(this.state.dataEvento === ''){
                    this.setState({botãoEvent: 'Selecione sua data'})
                  }
                  else if(this.state.localEvento === ''){
                    this.setState({botãoEvent: 'Digite o Local'})
                  }
                  else if(this.state.descricaoEvento === ''){
                    this.setState({botãoEvent: 'Digite sua Descrição'})
                  }
                  else{
                    axios.post(`/evento.json`, {
                      evento: this.state.evento,
                      data: this.state.dataEvento,
                      local: this.state.localEvento,
                      description: this.state.descricaoEvento,
                      condominio: this.props.condominio,
                      sindico: this.props.nome,
                    })
                    this.setState({botãoEvent: 'Enviando', evento: '', dataEvento: '', localEvento: '', descricaoEvento: '' })
                    setInterval(() => {
                      this.setState({
                        botãoEvent: 'Enviar',
                      })
                    }, 2000)
                  } 
                }
              }
                />
            </div>
        </div>
        <div className="searchBox mensalBoxInsert ">
        <p className="searchTitle">Ouvidoria</p>
            <ul className="comments">
              {commentsList}
            </ul>
        </div>

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

export default connect(mapStateToProps)(Dashboard);
// export default Dashboard