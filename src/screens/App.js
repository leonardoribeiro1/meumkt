import React from 'react';
import '../App.css'

import {Switch, Route} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'
import history from './History'


//Logomarca
import logo from '../assets/images/logo12.png'

//Início
import Inicio from '../screens/Inicio'

//Screen Home
import Home from '../screens/Home'

// Screen Childs
import item from './childs/item'

// Filter
import ListItem from './childs/listItems'

// Manager
import Dashboard from './manager/dashboard'

// Imagens
import Logo from '../assets/images/logo2.png'
import homeManager from './manager/homeManager';
import cadastroMorador from './manager/cadastroMorador';
import painelFinanceiro from './manager/painelFinanceiro';
import fluxoCaixa from './manager/fluxoCaixa';
import Login from './Login';
import admin from './admin/admin';


function App() {
  return (
    <div className="App">
        <Switch>
          {/* Tela de Início */}
          <Route path="/inicio" component={Inicio}/>
          <Route path="/home" component={Home}/>
          <Route exact path="/" component={Login}/>
          
          {/* Telas Childs */}
          <Route path="/listItems" component={ListItem}/>


          {/* Telas Manager */}
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/homeManager" component={homeManager}/>
          <Route path="/cadastroMorador" component={cadastroMorador}/>
          <Route path="/painelFinanceiro" component={painelFinanceiro}/>
          <Route path="/fluxoCaixa" component={fluxoCaixa}/>


          {/* Telas Grandson */}
          <Route path="/item" component={item}/>

          {/* Telas Admin */}
          <Route path="/adminMeuhallRoot" component={admin}/>


        </Switch>
      
      <footer className="footer">
        <div className="footer-logo">
          <img src={Logo} className="logoFooter"/>
          <p>From Linked</p>
        </div>
      </footer>
    </div>
    
  );
}

export default App;
