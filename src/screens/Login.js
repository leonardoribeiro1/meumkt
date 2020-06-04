import React, { Component } from 'react';
import ReactPlayer from 'react-player'

import {connect} from 'react-redux'
import {LoggedIn} from '../store/actions'
import {bindActionCreators} from 'redux'

import logo from '../assets/images/LOGO-MEUHALL-SF.png'
import bg101 from '../assets/images/BANNER.png'
import bg102 from '../assets/images/bg112.jpg'
import '../App.css'

//Icones
function goHome(){
  window.location.href = "/"
}

const onKeyDown = (event) => {
  if(event.key === 'Enter'){
    // entrar();
  }else{
    console.log('Não fui')
  }
}

class Login extends Component{
  state = {
      email: '',
      name: 'Leonardo',
      tipo: 'morador',
      condominio: 'Condominio Montserrat',
    }
  
  render() {
    return (
    <div className="App">
    <div className="backgroundHero heroPg">
      
    <p>
      <img className="backgroundHero heroPg heroLogin" src={bg101}/>
    </p>
    
        </div>
        <img className="App-logo" src={logo} alt-text="Logotipo" onClick={goHome}/>

        <header className="item-header-dashboard">
        </header>

        <div className="searchBox itemBoxInsert loginBox">
            <p className="searchTitle">Login</p>
            <form>
              <input type="text" className="inputStyle searchText inputText inputSmall inputItem " placeholder="Email" 
              value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}
              />
              <input type="password" className="inputStyle searchText inputText inputSmall inputItem " placeholder="Senha"
              onKeyDown={onKeyDown}
              value={this.state.senha} onChange={(event) => this.setState({senha: event.target.value})}
              />
              <div className="btnBox">
                  <input type="button" onClick={
                  (() => {
                    if(this.state.email === ''){
                      alert('Digite seu email')
                    }else if(this.state.senha === ''){
                      alert('digite sua senha')
                    }else{
                      this.props.LoggedIn(this.state)
                      window.location.href = window.location.href + "inicio"
                    }
                  }
                  )
                    }className="btnSend" value="Entrar"/>
              </div>
            </form>
        </div>

    </div>
    )
  }
}

const mapStateToProps = store => {
  return{
    nome: store.user.name,
    tipo: store.user.tipo,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ LoggedIn }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
// export default Gestao