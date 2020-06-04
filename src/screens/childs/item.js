import React, { Component } from 'react';
import ReactPlayer from 'react-player'

import axios from 'axios'

import {connect} from 'react-redux'

import logo from '../../assets/images/LOGO-MEUHALL-SF.png'
import bg101 from '../../assets/images/BANNER.png'
import bg102 from '../../assets/images/BANNER.png'
import '../../App.css'

import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'

//Icones

function onClickHandler(){
    // const data = new FormData() 
    // data.append('file', this.state.selectedFile)
    console.log('Botão funciona')
    console.log(this.state.id)
}

function goFilter(){
    window.location.href = "listItems"
  }

  const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -4.1801, lng: -38.2952 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -4.1801, lng: -38.2952 }} />}
  </GoogleMap>
  ))

class Gestao extends Component{
  constructor(props){
    super(props)
    this.state = {
      id: this.props.id,
      tipo: this.props.tipoItem,
      userType: this.props.tipo,
      title: '',
      description: '',
      data: '',
    }
  }


  loadAvisos = async () => {
    await axios.get(`aviso/${this.state.id}.json`)
            .catch(err => console.log(err))
            .then(res => {
              this.setState({
                title: res.data.aviso,
                description: res.data.description,
                data: res.data.data,
                // diciplina: res.data.diciplina,
                // nome: res.data.author,
                // image: res.data.imageAuth,
              })
            })
  }

  componentDidMount() {
    const loadPage  = () => this.loadAvisos()
    loadPage()
  }

  
  
  render() {
    return (
      <div className="App">
      <div className="backgroundHero heroPg">
          <p><img className="backgroundHero heroPg" src={bg102}/></p>
        </div>
      <img className="App-logo" src={logo} alt-text="Logotipo" 
      onClick={
        () => {
          if(this.state.userType === 'sindico'){
            window.location.href = "/homeManager"
          }else if(this.state.userType === 'morador'){
            window.location.href = "/inicio"
          }
        }
      } />

      <header className="item-header-content">
        <ul>
          <li className="box-Item box-Item01">
                <div className="boxItem-text">
                  <h1 className="titleLocal">{this.state.title} </h1>
                    <p className="txtItem txtBigItem">
                      {this.state.description}
                    </p>
                </div>

          {/* <div className="download">
            <p>download</p>
          </div> */}
          
          </li>
          

         </ul>
    </header>
    </div>
    )
  }
}


const mapStateToProps = store => {
  return{
    id: store.lembretes.id,
    tipoItem: store.lembretes.tipo,
    tipo: store.user.tipo,
  }
};

export default connect(mapStateToProps)(Gestao)
// export default Gestao