import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

var data = {
  respostas : {
    "11":""
    , "12":""
    , "13":""
    , "21":""
    , "22":""
    , "23":""
    , "31":""
    , "32":""
    , "33":""
  }
  , jogar: 1
  , jogador:1
}
class Coluna extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.data.onClick(this.props.data.linha + "" + this.props.coluna);
  }
  render() {
    var mens = this.props.data.data.respostas[this.props.data.linha + "" + this.props.coluna]; 
    if (this.props.data.data.jogar < 2) {
      if (! mens) {
        mens = <button type="button" onClick={this.handleClick}>&nbsp; </button>;
      }
    }
    return (<td class={"c" + this.props.coluna}>
      {mens}
  </td>);
  }
}

function Linha(props) {
  return <tr class={"l" + props.linha}>
      <Coluna coluna="1" data={props}/>
      <Coluna coluna="2" data={props}/>
      <Coluna coluna="3" data={props} />
    </tr>;
}

class JogoDaVelha extends React.Component {
  constructor(props) {
    super(props);
    this.state = props; 
    this.handleClick = this.handleClick.bind(this);
  } 
  handleClick = function (celula) {
    var newState = this.state;
    newState.data.respostas[celula] = newState.data.jogador === 1 ? "X" : "O";
    var rs = newState.data.respostas;
    var pos = [
      rs["11"]+rs["12"]+rs["13"]
      , rs["21"]+rs["22"]+rs["23"]
      , rs["31"]+rs["32"]+rs["33"]
      , rs["11"]+rs["22"]+rs["33"]
      , rs["13"]+rs["22"]+rs["31"]
    ].indexOf(newState.data.jogador === 1 ? "XXX" : "OOO");
    if (pos < 0) {
      if ((rs["11"]+rs["12"]+rs["13"]+rs["21"]+rs["22"]+rs["23"]+rs["31"]+rs["32"]+rs["33"]).length === 9) {
        newState.data.jogar = 3;  
      } else {
        newState.data.jogador = newState.data.jogador === 1 ? 2 : 1;
      }
    } else {
      newState.data.jogar = 2;  
    }
    this.setState(newState);  
    console.log("click", celula, pos);   
  }     
  render() {
    return (<div>
        <h1>Jogo da velha</h1>
        <h2>
          {
            (this.state.data.jogar === 1 ? "Vez do jogador" : (this.state.data.jogar === 2 ? "Ganhou o jogador" : "Empate")) 
            + " " + this.state.data.jogador 
            + " " + (this.state.data.jogar === 1 ? (this.state.data.jogador === 1 ? "X" : "O") : "")
          }
        </h2>
        <center>
          <table>
            <Linha linha="1" data={this.state.data} onClick={this.handleClick} />
            <Linha linha="2" data={this.state.data} onClick={this.handleClick} />
            <Linha linha="3" data={this.state.data} onClick={this.handleClick} />
          </table>
        </center>
      </div>);
  }
}
export default function App(props) {
  return <div className="App>"><JogoDaVelha data={props.data}/></div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App data={data} />, rootElement);
